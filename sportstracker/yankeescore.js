async function getNYBaseballGameScores() {
  const apiKey = '100bd1992920e53de5b70fcb3e6267e4'; // replace with your own API key
  const currentYear = new Date().getFullYear();
  const currentSeason = `${currentYear}-${currentYear + 1}`;
  const yankeesEndpoint = `https://api.sportsdataio.com/v3/mlb/scores/json/GamesBySeason/${currentSeason}/YANK?api_key=${apiKey}`;
  const metsEndpoint = `https://api.sportsdataio.com/v3/mlb/scores/json/GamesBySeason/${currentSeason}/NYM?api_key=${apiKey}`;

  try {
    const [yankeesResponse, metsResponse] = await Promise.all([
      fetch(yankeesEndpoint),
      fetch(metsEndpoint),
    ]);

    const [yankeesData, metsData] = await Promise.all([
      yankeesResponse.json(),
      metsResponse.json(),
    ]);

    const games = [...yankeesData, ...metsData];

    const container = document.querySelector('.mlb');
    container.innerHTML = '';

    games.forEach((game) => {
      const gameElement = document.createElement('div');
      gameElement.innerHTML = `
        <p>${game.gameDate}</p>
        <div class="team-scores">
          <div class="team">${game.homeTeam.name}</div>
          <div class="score">${game.homeScore}</div>
          <div class="score">${game.awayScore}</div>
          <div class="team">${game.awayTeam.name}</div>
        </div>
      `;

      container.appendChild(gameElement);
    });
  } catch (error) {
    console.error('Error fetching NY baseball game scores:', error);
  }
}

getNYBaseballGameScores();