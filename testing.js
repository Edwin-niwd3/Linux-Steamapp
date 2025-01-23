async function fetchSteamData() {
  try {
      // Replace 'YOUR_API_KEY' with your actual Steam API key
      const apiKey = 'YOUR_API_KEY';
      const steamId = 'No key yet :('; // Example Steam ID
      const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.response && data.response.players.length > 0) {
          const player = data.response.players[0];

          // Update Box 1 and Box 2 with player data
          document.getElementById('box1').innerText = `Name: ${player.personaname}`;
          document.getElementById('box2').innerText = `Profile URL: ${player.profileurl}`;
      } else {
          document.getElementById('box1').innerText = 'No player data found.';
          document.getElementById('box2').innerText = 'No player data found.';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('box1').innerText = 'Error loading data.';
      document.getElementById('box2').innerText = 'Error loading data.';
  }
}

// Call the function to fetch data and update the content
fetchSteamData();