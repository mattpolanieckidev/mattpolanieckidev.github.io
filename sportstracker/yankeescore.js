async function getNYBaseballGameScores() {
  const apiKey = '100bd1992920e53de5b70fcb3e6267e4'; // replace with your own API key

  // Fetch Yankees games
  const yankeesEndpoint = 'https://v1.baseball.api-sports.io/games?league=1&season=2023&team=25';
  const yankeesResponse = await fetch(yankeesEndpoint, {
    headers: {
      'x-apisports-key': apiKey,
    },
  });
  const yankeesData = await yankeesResponse.json();
  const yankeesGames = yankeesData.response;

  // Fetch Mets games
  const metsEndpoint = 'https://v1.baseball.api-sports.io/games?league=1&season=2023&team=24';
  const metsResponse = await fetch(metsEndpoint, {
    headers: {
      'x-apisports-key': apiKey,
    },
  });
  const metsData = await metsResponse.json();
  const metsGames = metsData.response;

  const games = [...yankeesGames, ...metsGames];

  const currentDate = new Date();
  const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

  const filteredGames = games.filter(game => {
    const gameDate = new Date(game.date);
    return gameDate >= currentWeekStart && gameDate <= currentWeekEnd;
  });

  // Sort the games by date and time
  filteredGames.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    } else {
      const timeA = a.time.split(':');
      const timeB = b.time.split(':');
      const hourA = parseInt(timeA[0]);
      const minuteA = parseInt(timeA[1]);
      const hourB = parseInt(timeB[0]);
      const minuteB = parseInt(timeB[1]);

      if (hourA !== hourB) {
        return hourA - hourB;
      } else {
        return minuteA - minuteB;
      }
    }
  });

  const container = document.querySelector('.mlb');

  filteredGames.forEach(game => {
    const homeTeam = game.teams.home;
    const awayTeam = game.teams.away;
    const homeScore = game.scores.home.total;
    const awayScore = game.scores.away.total;

    const gameDate = new Date(game.date);
    const gameTime = game.time;

    // Extract date components
    const [year, month, day] = gameDate.toISOString().split('T')[0].split('-');

    // Extract time components
    const [hours, minutes] = gameTime.split(':');

    // Create new Date object in UTC
    const gameDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // Convert game time to EST
    const gameDateTimeEST = gameDateTime.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const gameDay = gameDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const logoHome = homeTeam.logo;
    const logoAway = awayTeam.logo;
    const homeTeamName = homeTeam.name;
    const awayTeamName = awayTeam.name;

    const isYankeesHome = homeTeamName === 'New York Yankees';
    const isMetsHome = homeTeamName === 'New York Mets';
    const opponentTeamName = isYankeesHome || isMetsHome ? awayTeamName : homeTeamName;
    const gameTitle = isYankeesHome ? `Yankees vs ${opponentTeamName}` : `Mets vs ${opponentTeamName}`;


    const card = document.createElement('div');
    card.classList.add('card');


    const teamInfo = document.createElement('div');
    teamInfo.classList.add('team-info');

    const cardHeader = document.createElement('h1');
    cardHeader.textContent = `${gameDay} (${gameDateTimeEST})`;
    card.appendChild(cardHeader);

    const homeTeamLogo = document.createElement('img');
    homeTeamLogo.src = isYankeesHome || isMetsHome ? logoAway : logoHome;
    homeTeamLogo.alt = `${homeTeamName} logo`;
    homeTeamLogo.classList.add('team-logo');
    
    const gameTitleText = document.createElement('p');
    gameTitleText.textContent = gameTitle;
    card.appendChild(gameTitleText);


    if (game.status.short === 'FT') {
      const scoreInfo = document.createElement('div');
      scoreInfo.classList.add('score-info');

      const homeScoreElem = document.createElement('p');
      homeScoreElem.textContent = `${homeTeamName}: ${homeScore}`;
      scoreInfo.appendChild(homeScoreElem);

      const awayScoreElem = document.createElement('p');
      awayScoreElem.textContent = `${awayTeamName}: ${awayScore}`;
      scoreInfo.appendChild(awayScoreElem);

      card.appendChild(scoreInfo);
    }

    container.appendChild(card);
  });
}

getNYBaseballGameScores();
