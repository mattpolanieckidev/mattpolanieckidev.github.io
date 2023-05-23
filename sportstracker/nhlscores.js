async function getNHLscores() {
    const apiKey = '100bd1992920e53de5b70fcb3e6267e4'; // replace with your own API key
  
    // Fetch Knicks games
    const islandersEndpoint = 'https://v1.hockey.api-sports.io/games?league=57&season=2022&team=691';
    const islandersResponse = await fetch(islandersEndpoint, {
      headers: {
        'x-apisports-key': apiKey,
      },
    });
  
    const islandersData = await islandersResponse.json();
  
    if (islandersData && islandersData.response) {
      const games = islandersData.response;
  
      const container = document.getElementById('nhlgame-scores-container');
      container.innerHTML = '';
  
      let gamesCount = 0;

    for (let i = games.length - 1; i >= 0; i--) {
      if (gamesCount === 7) {
        break;
      }

      const game = games[i];

      const homeTeam = game.teams?.home;
      const awayTeam = game.teams?.away;
      const homeScore = game.scores?.home;
      const awayScore = game.scores?.away;

      if (homeTeam && awayTeam && homeScore !== undefined && awayScore !== undefined) {
        const card = document.createElement('div');
        card.classList.add('card');

        const gameDate = new Date(game.date);
        const gameDateString = gameDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const gameDateElement = document.createElement('h1');
        gameDateElement.classList.add('game-date');
        gameDateElement.textContent = gameDateString;

        const homeTeamLogo = document.createElement('img');
        homeTeamLogo.src = homeTeam.logo;
        homeTeamLogo.classList.add('team-logo');

        const awayTeamLogo = document.createElement('img');
        awayTeamLogo.src = awayTeam.logo;
        awayTeamLogo.classList.add('team-logo');

        const homeTeamScore = document.createElement('p');
        homeTeamScore.classList.add('team-info');
        homeTeamScore.textContent = `${homeTeam.name}: ${homeScore}`;

        const awayTeamScore = document.createElement('p');
        awayTeamScore.classList.add('team-info');
        awayTeamScore.textContent = `${awayTeam.name}: ${awayScore}`;

        card.appendChild(gameDateElement);
        card.appendChild(homeTeamLogo);
        card.appendChild(homeTeamScore);
        card.appendChild(awayTeamLogo);
        card.appendChild(awayTeamScore);

        container.appendChild(card);

        gamesCount++;
      }
    }

    if (gamesCount === 0) {
      const noGamesCard = document.createElement('div');
      noGamesCard.classList.add('card');

      const noGamesText = document.createElement('p');
      noGamesText.classList.add('game-title');
      noGamesText.textContent = 'No games found';

      noGamesCard.appendChild(noGamesText);
      container.appendChild(noGamesCard);
    }
  } else {
    console.log('Unable to retrieve Knicks scores.');
  }
}
  
  getNHLscores();
  