async function fetchUserInfo() {
    try {
      const response = await fetch('https://api.lanyard.rest/v1/users/961063229168164864');
      const data = await response.json();

      if (!data.success) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = data.data;
      const discordUser = userInfo.discord_user;

      const userInfoDiv = document.getElementById('userInfo');
      if (userInfoDiv) {
        userInfoDiv.innerHTML = `
          <img src="https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}" alt="My orange autumn leaf avatar.">
          <p>Username: ${discordUser.username}</p>
          <p>Status: ${userInfo.discord_status}</p>
          <img src="https://cdn.discordapp.com/attachments/${discordUser.avatar_decoration_data.asset}/${discordUser.avatar_decoration_data.sku_id}" alt="Sparkly-eyed avatar decoration (yes I spent money on Discord. :skull:)">
          <p>Custom Status: ${userInfo.activities.find(activity => activity.type === 4)?.state || 'No custom status'}</p>
          <p>Activities:</p>
          <ul>
            ${userInfo.activities.map(activity => `<li>${activity.name} - ${activity.details || ''}</li>`).join('')}
          </ul>
        `;
      } else {
        console.error('Error: userInfoDiv is null');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  fetchUserInfo();