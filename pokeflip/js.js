// pokeflip/js.js
// Uses the Pokémon TCG API to get card images (falls back to PokeAPI sprites).
// Optional: set TCG_API_KEY if you have one (be careful — client-side keys are public).
const playerBench = document.querySelectorAll('.player-bench .pokemon');
const opponentBench = document.querySelectorAll('.opponent-bench .pokemon');
const playerActive = document.getElementById('player-active');
const opponentActive = document.getElementById('opponent-active');
const flipButton = document.getElementById('flip-button');
const playerKOsDisplay = document.getElementById('player-kos');
const opponentKOsDisplay = document.getElementById('opponent-kos');

// Optional TCG API key (leave blank to call without a key)
const TCG_API_KEY = '';

// inline placeholder image (data URI) to guarantee a visible fallback
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" fill="none">' +
  '<rect width="24" height="24" rx="2" ry="2" fill="#f3f3f3"/>' +
  '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#999" font-size="3">No Image</text>' +
  '</svg>'
);

// Local cache key and TTL (ms)
const CACHE_KEY = 'pokeflip_tcg_cache_v1';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

let playerBenchData = [];
let opponentBenchData = [];
let activePlayerPokemon = null;
let activeOpponentPokemon = null;
let playerTurn = true;
let playerKOs = 0;
let opponentKOs = 0;

/* -------------------------
   Caching helpers
   ------------------------- */
function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // prune expired entries
    const now = Date.now();
    const out = {};
    for (const k in parsed) {
      const entry = parsed[k];
      if (!entry || !entry.ts) continue;
      if (now - entry.ts < CACHE_TTL) out[k] = entry;
    }
    return out;
  } catch (e) {
    console.warn('TCG cache load failed', e);
    return {};
  }
}

function saveCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('TCG cache save failed', e);
  }
}

/* -------------------------
   Name mapping for TCG queries
   handles edge cases like nidoran, farfetchd, mr-mime, type: null, etc.
   ------------------------- */
const NAME_MAP = {
  'nidoran-f': 'Nidoran ♀',
  'nidoran-m': 'Nidoran ♂',
  'farfetchd': "Farfetch'd",
  'mr-mime': 'Mr. Mime',
  'mime-jr': 'Mime Jr.',
  'type-null': 'Type: Null',
  'jangmo-o': 'Jangmo-o',
  'hakamo-o': 'Hakamo-o',
  'kommo-o': 'Kommo-o',
  "flabebe": "Flabébé"
  // add more mappings if you encounter mismatches
};

function formatNameForTCG(name) {
  if (!name) return name;
  const mapped = NAME_MAP[name];
  if (mapped) return mapped;
  // Convert hyphenated names to proper-case spaced names e.g., 'mr-mime' -> 'Mr Mime'
  return name.split('-').map(s => {
    // preserve all-lowercase '♀' / symbols etc., but capitalize first letter
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(' ');
}

/* -------------------------
   TCG fetch: uses cache and returns an image URL (string) or null
   ------------------------- */
async function fetchCardImageForPokemon(name) {
  if (!name) return null;
  const cache = loadCache();
  const cacheKey = name.toLowerCase();
  if (cache[cacheKey] && cache[cacheKey].img) {
    return cache[cacheKey].img;
  }

  const formatted = formatNameForTCG(name);
  // Build query: search for cards by exact name (quoted)
  const params = new URLSearchParams({ q: `name:"${formatted}"` });
  const url = `https://api.pokemontcg.io/v2/cards?${params.toString()}`;
  const headers = TCG_API_KEY ? { 'X-Api-Key': TCG_API_KEY } : {};

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.debug('TCG API not ok', res.status, res.statusText, 'url=', url);
      // store negative result briefly to avoid hammering
      cache[cacheKey] = { img: null, ts: Date.now() };
      saveCache(cache);
      return null;
    }
    const data = await res.json();
    if (data && Array.isArray(data.data) && data.data.length > 0) {
      // Prefer 'large' then 'small'
      const card = data.data[0];
      const img = (card.images && (card.images.large || card.images.small)) || null;
      cache[cacheKey] = { img, ts: Date.now() };
      saveCache(cache);
      return img;
    } else {
      console.debug('TCG: no match for', name, 'formatted:', formatted, 'url=', url);
      cache[cacheKey] = { img: null, ts: Date.now() };
      saveCache(cache);
      return null;
    }
  } catch (err) {
    console.warn('TCG fetch error for', name, err);
    // store a quick negative result to reduce retries during offline errors
    cache[cacheKey] = { img: null, ts: Date.now() };
    saveCache(cache);
    return null;
  }
}

/* -------------------------
   PokeAPI sprite fallback helper
   ------------------------- */
function getSpriteFallback(p) {
  if (!p) return PLACEHOLDER_IMAGE;
  return (
    p.sprites?.other?.home?.front_default ||
    p.sprites?.other?.['official-artwork']?.front_default ||
    p.sprites?.front_default ||
    PLACEHOLDER_IMAGE
  );
}

/* -------------------------
   Existing game data + fetch logic
   ------------------------- */
async function fetchRandomPokemon() {
  const promises = [];
  for (let i = 0; i < 5; i++) {
    const randomId = Math.floor(Math.random() * 151) + 1;
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(res => {
      if (!res.ok) throw new Error('PokeAPI fetch failed: ' + res.status);
      return res.json();
    }));
  }
  // If any fetch fails, Promise.all will reject — keep that behavior so errors surface
  return Promise.all(promises);
}

async function initializeGame() {
  try {
    const [playerData, opponentData] = await Promise.all([fetchRandomPokemon(), fetchRandomPokemon()]);
    playerBenchData = playerData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null, cardImage: null }));
    opponentBenchData = opponentData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null, cardImage: null }));

    // Fetch TCG images in parallel but with per-pokemon caching
    await Promise.all(playerBenchData.map(async p => {
      const spriteFallback = getSpriteFallback(p);
      const img = await fetchCardImageForPokemon(p.name);
      p.cardImage = img || spriteFallback;
    }));

    await Promise.all(opponentBenchData.map(async p => {
      const spriteFallback = getSpriteFallback(p);
      const img = await fetchCardImageForPokemon(p.name);
      p.cardImage = img || spriteFallback;
    }));

    playerBench.forEach((el, index) => {
      const pokemon = playerBenchData[index];
      pokemon.benchIndex = index;
      updatePokemonDisplay(el, pokemon);
      el.addEventListener('click', () => swapPokemon(index));
    });

    opponentBench.forEach((el, index) => {
      const pokemon = opponentBenchData[index];
      pokemon.benchIndex = index;
      updatePokemonDisplay(el, pokemon);
    });

    swapPokemon(0);
    activeOpponentPokemon = opponentBenchData[0];
    updatePokemonDisplay(opponentActive, activeOpponentPokemon);

    playerKOsDisplay.textContent = playerKOs;
    opponentKOsDisplay.textContent = opponentKOs;
  } catch (err) {
    console.error('initializeGame error', err);
    // In case of errors, attempt a fallback initialization using sprites only
    try {
      const [pData, oData] = await Promise.all([fetchRandomPokemon(), fetchRandomPokemon()]);
      playerBenchData = pData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null, cardImage: getSpriteFallback(pokemon) }));
      opponentBenchData = oData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null, cardImage: getSpriteFallback(pokemon) }));
      playerBench.forEach((el, index) => {
        const pokemon = playerBenchData[index];
        pokemon.benchIndex = index;
        updatePokemonDisplay(el, pokemon);
        el.addEventListener('click', () => swapPokemon(index));
      });
      opponentBench.forEach((el, index) => {
        const pokemon = opponentBenchData[index];
        pokemon.benchIndex = index;
        updatePokemonDisplay(el, pokemon);
      });
      swapPokemon(0);
      activeOpponentPokemon = opponentBenchData[0];
      updatePokemonDisplay(opponentActive, activeOpponentPokemon);
    } catch (e) {
      console.error('Fallback initialization also failed', e);
    }
  }
}

/* -------------------------
   DOM update helpers
   ------------------------- */
function updatePokemonDisplay(element, pokemon) {
  // Guarantee a non-empty src; prefer cardImage, then sprite fallback, then placeholder.
  const spriteFallback = getSpriteFallback(pokemon);
  const imgSrc = pokemon.cardImage || spriteFallback || PLACEHOLDER_IMAGE;

  element.innerHTML = ''; // clear to build node elements with handlers

  const img = document.createElement('img');
  img.alt = pokemon.name || '';
  img.src = imgSrc;
  img.className = 'pokemon-image';
  // On image load failure, try sprite fallback then placeholder
  img.onerror = function () {
    try {
      if (img.src !== spriteFallback && spriteFallback) {
        console.debug('Image load failed, falling back to sprite for', pokemon.name, img.src);
        img.src = spriteFallback;
      } else if (img.src !== PLACEHOLDER_IMAGE) {
        console.debug('Image load failed, falling back to placeholder for', pokemon.name, img.src);
        img.src = PLACEHOLDER_IMAGE;
      }
    } catch (e) {
      console.warn('onerror handling failed for', pokemon.name, e);
      img.src = PLACEHOLDER_IMAGE;
    }
  };

  element.appendChild(img);

  const nameSpan = document.createElement('span');
  nameSpan.textContent = pokemon.name || '';
  element.appendChild(nameSpan);

  const healthWrap = document.createElement('div');
  healthWrap.className = 'health-bar';
  const healthInner = document.createElement('div');
  healthInner.className = 'health';
  healthWrap.appendChild(healthInner);
  element.appendChild(healthWrap);

  updateHealthBar(element, pokemon.currentHealth, pokemon.maxHealth);

  if (pokemon.currentHealth <= 0) {
    element.classList.add('fainted');
  } else {
    element.classList.remove('fainted');
  }
}

function updateHealthBar(pokemonElement, currentHealth, maxHealth) {
  const healthBar = pokemonElement.querySelector('.health');
  if (!healthBar) return;
  const percentage = (currentHealth / maxHealth) * 100;
  healthBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
  if (percentage < 30) {
    healthBar.style.backgroundColor = "red";
  } else if (percentage < 60) {
    healthBar.style.backgroundColor = "yellow";
  } else {
    healthBar.style.backgroundColor = "green";
  }
}

function updateBenchDisplay() {
  playerBench.forEach((el, index) => {
    const pokemon = playerBenchData[index];
    updatePokemonDisplay(el, pokemon);
  });

  opponentBench.forEach((el, index) => {
    const pokemon = opponentBenchData[index];
    updatePokemonDisplay(el, pokemon);
  });
}

/* -------------------------
   Game mechanics (unchanged)
   ------------------------- */
function swapPokemon(index) {
  activePlayerPokemon = playerBenchData[index];
  updatePokemonDisplay(playerActive, activePlayerPokemon);
  highlightActivePokemon(index);
}

function highlightActivePokemon(index) {
  playerBench.forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

flipButton.addEventListener('click', () => {
  if (!playerTurn) return;

  playerTurn = false;
  const playerResult = Math.random() < 0.5 ? 'Heads' : 'Tails';

  if (playerResult === 'Heads') {
    if (activeOpponentPokemon) {
      activeOpponentPokemon.currentHealth -= 20;
      updatePokemonDisplay(opponentActive, activeOpponentPokemon);
      updateBenchPokemon(opponentBenchData, activeOpponentPokemon);

      if (activeOpponentPokemon.currentHealth <= 0) {
        alert('Opponent Pokemon Knocked Out!');
        playerKOs++;
        playerKOsDisplay.textContent = playerKOs;
        handleOpponentKnockout();
      } else {
        setTimeout(cpuTurn, 1000);
      }
    }
  } else {
    alert('Player Attack Missed!');
    setTimeout(cpuTurn, 1000);
  }
});

function cpuTurn() {
  if (!activePlayerPokemon) {
    playerTurn = true;
    return;
  }
  const cpuResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
  if (cpuResult === 'Heads') {
    if (activePlayerPokemon) {
      activePlayerPokemon.currentHealth -= 20;
      updatePokemonDisplay(playerActive, activePlayerPokemon);
      updateBenchPokemon(playerBenchData, activePlayerPokemon);

      if (activePlayerPokemon.currentHealth <= 0) {
        alert('Your Pokemon was Knocked Out!');
        opponentKOs++;
        opponentKOsDisplay.textContent = opponentKOs;
        handlePlayerKnockout();
      }
    }
  } else {
    alert('CPU Attack Missed!');
  }

  playerTurn = true;
}

function updateBenchPokemon(benchData, pokemon) {
  if (pokemon.benchIndex !== null) {
    benchData[pokemon.benchIndex].currentHealth = pokemon.currentHealth;
    benchData[pokemon.benchIndex].cardImage = pokemon.cardImage || benchData[pokemon.benchIndex].cardImage;
  }
  updateBenchDisplay();
}

function handleOpponentKnockout() {
  const availableOpponents = opponentBenchData.filter(pokemon => pokemon.currentHealth > 0);
  if (availableOpponents.length > 0) {
    const nextOpponentIndex = opponentBenchData.indexOf(availableOpponents[0]);
    activeOpponentPokemon = opponentBenchData[nextOpponentIndex];
    updatePokemonDisplay(opponentActive, activeOpponentPokemon);
    updateBenchDisplay();
    playerTurn = true; // VERY IMPORTANT: Set playerTurn back to true
  } else {
    alert("You Win!");
    resetGame();
  }
}

function handlePlayerKnockout() {
  const availablePlayers = playerBenchData.filter(pokemon => pokemon.currentHealth > 0);
  if (availablePlayers.length > 0) {
    const nextPlayerIndex = playerBenchData.indexOf(availablePlayers[0]);
    swapPokemon(nextPlayerIndex);
    updateBenchDisplay();
  } else {
    alert("You Lose!");
    resetGame();
  }
}

function resetGame() {
  playerKOs = 0;
  opponentKOs = 0;
  playerKOsDisplay.textContent = playerKOs;
  opponentKOsDisplay.textContent = opponentKOs;
  playerBench.forEach(el => el.removeEventListener('click', swapPokemon));
  playerBenchData = playerBenchData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null }));
  opponentBenchData = opponentBenchData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null }));
  initializeGame();
}

/* -------------------------
   Start game
   ------------------------- */
initializeGame();
