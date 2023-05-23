async function getYankeeGameScores() {
    const apiKey = '100bd1992920e53de5b70fcb3e6267e4'; // replace with your own API key
    const endpoint = 'https://v1.baseball.api-sports.io/games?league=1&season=2023&team=24';
  
    const response = await fetch(endpoint, {
      headers: {
        'x-apisports-key': apiKey,
      },
    });
  
    const data = await response.json();
  
    const games = data.response;
  
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
  
    const filteredGames = games.filter(game => {
      const gameDate = new Date(game.date);
      return gameDate >= currentWeekStart && gameDate <= currentWeekEnd;
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
    
      const isYankeesHome = homeTeamName === 'New York Mets';
      const opponentTeamName = isYankeesHome ? awayTeamName : homeTeamName;
      const gameTitle = isYankeesHome ? `Mets vs ${opponentTeamName}` : `Mets @ ${opponentTeamName}`;
    
      const card = document.createElement('div');
      card.classList.add('card');
    
      const gameDateElem = document.createElement('h1');
      gameDateElem.textContent = gameDay;
      gameDateElem.classList.add('game-date');
      card.appendChild(gameDateElem);
    
      const gameTitleElem = document.createElement('h2');
      gameTitleElem.textContent = gameTitle;
      gameTitleElem.classList.add('game-title');
      card.appendChild(gameTitleElem);
    
      const scoreInfo = document.createElement('div');
      scoreInfo.classList.add('score-info');
    
      const homeLogoScore = document.createElement('div');
      homeLogoScore.classList.add('logo-score');
    
      const homeTeamLogo = document.createElement('img');
      homeTeamLogo.src = logoHome;
      homeTeamLogo.alt = `${homeTeamName} logo`;
      homeTeamLogo.classList.add('team-logo');
      homeLogoScore.appendChild(homeTeamLogo);
    
      const homeScoreElem = document.createElement('p');
      homeScoreElem.textContent = `${homeTeamName}: ${homeScore}`;
      homeLogoScore.appendChild(homeScoreElem);
    
      scoreInfo.appendChild(homeLogoScore);
    
      const awayLogoScore = document.createElement('div');
      awayLogoScore.classList.add('logo-score');
    
      const awayTeamLogo = document.createElement('img');
      awayTeamLogo.src = logoAway;
      awayTeamLogo.alt = `${awayTeamName} logo`;
      awayTeamLogo.classList.add('team-logo');
      awayLogoScore.appendChild(awayTeamLogo);
    
    
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
    
  
  
  getYankeeGameScores();
  