const playerBench = document.querySelectorAll('.player-bench .pokemon');
const opponentBench = document.querySelectorAll('.opponent-bench .pokemon');
const playerActive = document.getElementById('player-active');
const opponentActive = document.getElementById('opponent-active');
const flipButton = document.getElementById('flip-button');
const playerKOsDisplay = document.getElementById('player-kos');
const opponentKOsDisplay = document.getElementById('opponent-kos');

// Optional: set your Pokémon TCG API key here (leave empty to call without a key)
const TCG_API_KEY = '';

let playerBenchData = [];
let opponentBenchData = [];
let activePlayerPokemon = null;
let activeOpponentPokemon = null;
let playerTurn = true;
let playerKOs = 0;
let opponentKOs = 0;

async function fetchRandomPokemon() {
    const promises = [];
    for (let i = 0; i < 5; i++) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(res => res.json()));
    }
    return Promise.all(promises);
}

// Helper to format names for better matching with the TCG API (e.g. "mr-mime" -> "Mr Mime")
function formatNameForTCG(name) {
    return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

// Fetch a TCG card for a given Pokemon name. Returns the first matching card or null.
async function fetchCardForPokemon(name) {
    try {
        const formatted = formatNameForTCG(name);
        // Use quoted query to better match multi-word names
        const query = `q=name:\"${encodeURIComponent(formatted)}\"`;
        const url = `https://api.pokemontcg.io/v2/cards?${query}`;
        const headers = TCG_API_KEY ? { 'X-Api-Key': TCG_API_KEY } : {};
        const res = await fetch(url, { headers });
        if (!res.ok) return null;
        const data = await res.json();
        if (data && data.data && data.data.length) return data.data[0];
        return null;
    } catch (err) {
        console.warn('TCG fetch error for', name, err);
        return null;
    }
}

async function initializeGame() {
    const [playerData, opponentData] = await Promise.all([fetchRandomPokemon(), fetchRandomPokemon()]);

    playerBenchData = playerData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null, cardImage: null }));
    opponentBenchData = opponentData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100, benchIndex: null, cardImage: null }));

    // Try to fetch TCG card images for all bench pokemon (parallel)
    await Promise.all(playerBenchData.map(async p => {
        const card = await fetchCardForPokemon(p.name);
        if (card && card.images) {
            p.cardImage = card.images.large || card.images.small || p.sprites.other.home.front_default;
        } else {
            p.cardImage = p.sprites.other.home.front_default;
        }
    }));

    await Promise.all(opponentBenchData.map(async p => {
        const card = await fetchCardForPokemon(p.name);
        if (card && card.images) {
            p.cardImage = card.images.large || card.images.small || p.sprites.other.home.front_default;
        } else {
            p.cardImage = p.sprites.other.home.front_default;
        }
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
}

function updatePokemonDisplay(element, pokemon) {
    const imgSrc = pokemon.cardImage || (pokemon.sprites && pokemon.sprites.other && pokemon.sprites.other.home && pokemon.sprites.other.home.front_default) || '';
    element.innerHTML = `<img src="${imgSrc}" alt="${pokemon.name}"><span>${pokemon.name}</span><div class="health-bar"><div class="health"></div></div>`;
    updateHealthBar(element, pokemon.currentHealth, pokemon.maxHealth);
    if (pokemon.currentHealth <= 0) {
        element.classList.add('fainted');
    } else {
        element.classList.remove('fainted');
    }
}

function updateHealthBar(pokemonElement, currentHealth, maxHealth) {
    const healthBar = pokemonElement.querySelector('.health');
    const percentage = (currentHealth / maxHealth) * 100;
    healthBar.style.width = `${percentage}%`;
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
        // keep cardImage in sync as well
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

initializeGame();
