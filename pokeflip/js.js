const playerBench = document.querySelectorAll('.player-bench .pokemon');
const opponentBench = document.querySelectorAll('.opponent-bench .pokemon');
const playerActive = document.getElementById('player-active');
const opponentActive = document.getElementById('opponent-active');
const flipButton = document.getElementById('flip-button');
const playerScore = document.getElementById('player-score');
const playerKOsDisplay = document.getElementById('player-kos');
const opponentKOsDisplay = document.getElementById('opponent-kos');

let playerBenchData = [];
let opponentBenchData = [];
let activePlayerPokemon = null;
let activeOpponentPokemon = null;
let playerHits = 0;
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

async function initializeGame() {
    const [playerData, opponentData] = await Promise.all([fetchRandomPokemon(), fetchRandomPokemon()]);

    playerBenchData = playerData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100 }));
    opponentBenchData = opponentData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100 }));

    playerBench.forEach((el, index) => {
        const pokemon = playerBenchData[index];
        updatePokemonDisplay(el, pokemon);
        el.addEventListener('click', () => swapPokemon(index));
    });

    opponentBench.forEach((el, index) => {
        const pokemon = opponentBenchData[index];
        updatePokemonDisplay(el, pokemon);
    });

    swapPokemon(0);
    activeOpponentPokemon = opponentBenchData[0];
    updatePokemonDisplay(opponentActive, activeOpponentPokemon);

    playerKOsDisplay.textContent = playerKOs;
    opponentKOsDisplay.textContent = opponentKOs;
}

function updatePokemonDisplay(element, pokemon) {
    element.innerHTML = `<img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}"><span>${pokemon.name}</span><div class="health-bar"><div class="health"></div></div>`;
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
        playerHits++;
        if (activeOpponentPokemon) {
            activeOpponentPokemon.currentHealth -= 20;
            updatePokemonDisplay(opponentActive, activeOpponentPokemon);

            if (activeOpponentPokemon.currentHealth <= 0) {
                alert('Opponent Pokemon Knocked Out!');
                playerKOs++;
                playerKOsDisplay.textContent = playerKOs;
                handleOpponentKnockout();
                updateBenchDisplay();
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

            if (activePlayerPokemon.currentHealth <= 0) {
                alert('Your Pokemon was Knocked Out!');
                opponentKOs++;
                opponentKOsDisplay.textContent = opponentKOs;
                handlePlayerKnockout();
                updateBenchDisplay();
            }
        }
    } else {
        alert('CPU Attack Missed!');
    }

    playerTurn = true;
}

function handleOpponentKnockout() {
    const availableOpponents = opponentBenchData.filter(pokemon => pokemon.currentHealth > 0);
    if (availableOpponents.length > 0) {
        const nextOpponentIndex = opponentBenchData.indexOf(availableOpponents[0]);
        activeOpponentPokemon = opponentBenchData[nextOpponentIndex];
        updatePokemonDisplay(opponentActive, activeOpponentPokemon);
        playerHits = 0;
        updateBenchDisplay(); // Update the bench after changing active pokemon
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
        updateBenchDisplay(); // Update the bench after swapping
    } else {
        alert("You Lose!");
        resetGame();
    }
}

function resetGame() {
    playerHits = 0;
    playerScore.textContent = playerHits;
    playerKOs = 0;
    opponentKOs = 0;
    playerKOsDisplay.textContent = playerKOs;
    opponentKOsDisplay.textContent = opponentKOs;

    playerBench.forEach(el => el.removeEventListener('click', swapPokemon)); // Remove old listeners

    playerBenchData = playerBenchData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100 }));
    opponentBenchData = opponentBenchData.map(pokemon => ({ ...pokemon, currentHealth: 100, maxHealth: 100 }));
    initializeGame(); // Re-initialize the game (including event listeners)
}

initializeGame();