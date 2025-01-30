document.getElementById("fetchUserDetails").addEventListener("click", async function() {
    let steamId = document.getElementById("steamIdInput").value;

    if (!steamId) {
        alert("Please enter a Steam ID.");
        return;
    }

    try {
        // Fetch user details
        let userResponse = await fetch(`http://127.0.0.1:5000/steam/user?steam_id=${steamId}`);
        let userData = await userResponse.json();
        updateUserTable(userData);

        // Fetch ban status
        let banResponse = await fetch(`http://127.0.0.1:5000/steam/ban?steam_id=${steamId}`);
        let banData = await banResponse.json();
        updateBanTable(banData);

        // Fetch user groups
        let groupsResponse = await fetch(`http://127.0.0.1:5000/steam/groups?steam_id=${steamId}`);
        let groupsData = await groupsResponse.json();
        updateGroupsTable(groupsData);
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Function to update the user table
function updateUserTable(user) {
    let userDetails = document.getElementById("userDetails");
    if (user.error) {
        userDetails.innerHTML = `<tr><td colspan="2">Error: ${user.error}</td></tr>`;
    } else {
        userDetails.innerHTML = `
            <tr>
                <td><strong>Username:</strong></td>
                <td>${user.personaname}</td>
            </tr>
            <tr>
                <td><strong>Avatar:</strong></td>
                <td><img src="${user.avatar}" alt="User Avatar"></td>
            </tr>
        `;
    }
}

// Function to update the ban status table
function updateBanTable(ban) {
    let banStatus = document.getElementById("banStatus");
    if (ban.error) {
        banStatus.innerHTML = `<tr><td colspan="2">Error: ${ban.error}</td></tr>`;
    } else {
        banStatus.innerHTML = `
            <tr>
                <td><strong>VAC Banned:</strong></td>
                <td>${ban.VACBanned ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td><strong>Number of VAC Bans:</strong></td>
                <td>${ban.NumberOfVACBans}</td>
            </tr>
            <tr>
                <td><strong>Community Banned:</strong></td>
                <td>${ban.CommunityBanned ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td><strong>Game Bans:</strong></td>
                <td>${ban.NumberOfGameBans}</td>
            </tr>
        `;
    }
}

// Function to update the groups table
function updateGroupsTable(groups) {
    let groupsList = document.getElementById("groupsList");
    if (groups.error) {
        groupsList.innerHTML = `<tr><td colspan="2">Error: ${groups.error}</td></tr>`;
    } else {
        let groupsHTML = groups.map(group => `
            <tr><td>Group ID</td><td>${group.gid}</td></tr>
        `).join("");
        groupsList.innerHTML = groupsHTML;
    }
}


//test id 76561198073885832