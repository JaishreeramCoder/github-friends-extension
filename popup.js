document.addEventListener('DOMContentLoaded', function () {
    loadUsers();
  });
  
  function loadUsers() {
    chrome.storage.local.get(['starredUsers'], function (result) {
      const users = result.starredUsers || [];
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
  
      if (users.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = "No starred users yet.";
        userList.appendChild(emptyMessage);
        return;
      }
  
      users.forEach((user) => {
        const li = document.createElement('li');
        li.classList.add('user-item');
        li.innerHTML = `
          <div class="user-info">
            <div class="user-header">
              <span class="actual-name">${user.actualName}</span>
              <span class="nickname">(${user.nickname})</span>
            </div>
            <div class="user-details">
              <span class="pronoun">${user.pronoun || ''}</span>
              <span class="commit-time">Fetching last commit...</span>
            </div>
            <div class="actions">
              <button class="github-btn" title="Visit GitHub Profile"></button>
              <button class="unfriend-btn" title="Unfriend">Unfriend</button>
            </div>
          </div>
        `;
  
        // Open the GitHub profile when clicking the GitHub button.
        li.querySelector('.github-btn').addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent triggering the li click event.
          chrome.tabs.create({ url: user.profileUrl });
        });
  
        // Unfriend button: remove the user from storage.
        li.querySelector('.unfriend-btn').addEventListener('click', function (e) {
          e.stopPropagation();
          chrome.storage.local.get({ starredUsers: [] }, function (result) {
            let starredUsers = result.starredUsers;
            starredUsers = starredUsers.filter((u) => u.profileUrl !== user.profileUrl);
            chrome.storage.local.set({ starredUsers: starredUsers }, function () {
              loadUsers(); // Refresh the popup list.
            });
          });
        });
  
        // Clicking anywhere else on the box also opens the user's GitHub profile.
        li.addEventListener('click', function () {
          chrome.tabs.create({ url: user.profileUrl });
        });
  
        userList.appendChild(li);
  
        // Request the last commit time from background.js.
        chrome.runtime.sendMessage(
          { action: 'fetchCommitTime', username: user.nickname },
          function (response) {
            if (response && response.lastCommit) {
              li.querySelector('.commit-time').textContent =
                'Last Push: ' + new Date(response.lastCommit).toLocaleString();
            } else {
              li.querySelector('.commit-time').textContent = 'No last push data';
            }
          }
        );
      });
    });
  }
  