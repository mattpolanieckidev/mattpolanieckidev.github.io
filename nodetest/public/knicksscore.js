async function getGameScore(teamId, date) {
  const apiKey = '100bd1992920e53de5b70fcb3e6267e4';
  const endpoint = `https://v1.basketball.api-sports.io/games?league=12&season=2022-2023&team=${teamId}&date=${date}`;
  const response = await fetch(endpoint, {
    headers: {
      'x-apisports-key': apiKey,
    },
  });
  const data = await response.json();
  const game = data.response[0];
  const homeTeam = game.teams.home;
  const awayTeam = game.teams.away;
  const homeScore = game.scores.home.total;
  const awayScore = game.scores.away.total;

  const card = document.createElement('div');
  card.classList.add('card');

  const homeTeamLogo = document.createElement('img');
  homeTeamLogo.src = homeTeam.logo;
  homeTeamLogo.classList.add('team-logo');

  const awayTeamLogo = document.createElement('img');
  awayTeamLogo.src = awayTeam.logo;
  awayTeamLogo.classList.add('team-logo');

  const homeTeamScore = document.createElement('div');
  homeTeamScore.classList.add('team-score');
  homeTeamScore.textContent = `${homeTeam.name} ${homeScore}`;

  const awayTeamScore = document.createElement('div');
  awayTeamScore.classList.add('team-score');
  awayTeamScore.textContent = `${awayTeam.name} ${awayScore}`;

  card.appendChild(homeTeamLogo);
  card.appendChild(homeTeamScore);
  card.appendChild(awayTeamLogo);
  card.appendChild(awayTeamScore);

  return card;
}

async function displayknick() {
    const container = document.getElementById('knicks-scores-container');
    container.innerHTML = '';
  
    const card = await getGameScore(151, '2023-05-12');
    container.appendChild(card);

  }
  
  displayknick();
  ;