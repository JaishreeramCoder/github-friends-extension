(function () {
    // Helper function to update the star icon based on friendship status.
    function updateStarIcon(starIcon, isStarred) {
      // Use a golden star (★) for friends and a hollow star (☆) for non-friends.
      starIcon.textContent = isStarred ? '⭐' : '☆';
    }
  
    // Function to add (or update) the star button next to the user's full name.
    function addStarButton() {
      const vcardNames = document.querySelector('.vcard-names');
      if (!vcardNames) return;
  
      // Prevent adding duplicate star icons.
      let starIcon = vcardNames.querySelector('.star-icon');
      if (!starIcon) {
        starIcon = document.createElement('span');
        starIcon.className = 'star-icon';
        starIcon.style.cursor = 'pointer';
        starIcon.style.marginLeft = '10px';
        starIcon.title = 'Toggle friend status';
        // Default to hollow star.
        starIcon.textContent = '☆';
  
        // Insert the star icon right next to the user's full name
        const actualNameElement = vcardNames.querySelector('.p-name');
        if (actualNameElement) {
          // Override GitHub's display: block !important with inline
          actualNameElement.style.setProperty('display', 'inline', 'important');
          actualNameElement.parentNode.insertBefore(starIcon, actualNameElement.nextSibling);
        } else {
          vcardNames.appendChild(starIcon);
        }
      }
  
      // Extract user information.
      const profileUrl = window.location.href;
      const actualNameElement = document.querySelector('.vcard-names .p-name');
      const nicknameElement = document.querySelector('.vcard-names .p-nickname');
      const pronounElement = document.querySelector('.vcard-names [itemprop="pronouns"]');
  
      const actualName = actualNameElement ? actualNameElement.textContent.trim() : '';
      // Updated nickname extraction:
      const nickname = nicknameElement
        ? nicknameElement.childNodes[0].textContent.replace(/\s+/g, ' ').trim().split(' ')[0]
        : '';
      const pronoun = pronounElement ? pronounElement.textContent.trim() : '';
  
      // Check if this profile is already starred.
      chrome.storage.local.get({ starredUsers: [] }, function (result) {
        const starredUsers = result.starredUsers;
        const isStarred = starredUsers.some((u) => u.profileUrl === profileUrl);
        updateStarIcon(starIcon, isStarred);
      });
  
      // Toggle friend/unfriend on click.
      starIcon.addEventListener('click', function () {
        chrome.storage.local.get({ starredUsers: [] }, function (result) {
          let starredUsers = result.starredUsers;
          const existingIndex = starredUsers.findIndex((u) => u.profileUrl === profileUrl);
  
          if (existingIndex !== -1) {
            // Unfriend: Remove the user.
            starredUsers.splice(existingIndex, 1);
            chrome.storage.local.set({ starredUsers: starredUsers }, function () {
              updateStarIcon(starIcon, false);
              alert(`Unfriended ${actualName || nickname}`);
            });
          } else {
            // Friend: Add the user.
            const user = {
              profileUrl,
              actualName,
              nickname,
              pronoun,
            };
            starredUsers.push(user);
            chrome.storage.local.set({ starredUsers: starredUsers }, function () {
              updateStarIcon(starIcon, true);
              alert(`Starred ${actualName || nickname}!`);
            });
          }
        });
      });
    }
  
    // Initial run when DOM is ready.
    document.addEventListener('DOMContentLoaded', addStarButton);
    // Fallback in case of delayed content load.
    setTimeout(addStarButton, 2000);
  
    // For GitHub's SPA navigation, detect URL changes.
    let lastUrl = location.href;
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        // Allow time for the new content to load before adding the star button.
        setTimeout(addStarButton, 1000);
      }
    }, 500);
  })();
  