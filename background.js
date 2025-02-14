// Listen for messages from the popup (or elsewhere)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchCommitTime') {
      getLastCommitTime(message.username)
        .then((lastCommitTime) => {
          sendResponse({ lastCommit: lastCommitTime });
        })
        .catch((err) => {
          console.error(err);
          sendResponse({ lastCommit: null });
        });
      // Return true to indicate asynchronous response.
      return true;
    }
  });
  
  // Optimized function to get the last commit time using the "pushed_at" property.
  async function getLastCommitTime(username) {
    try {
      // Fetch the list of public repositories for the user.
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories for ${username}. Status: ${reposResponse.status}`);
      }
      const repos = await reposResponse.json();
      if (repos.length === 0) {
        console.log("No repositories found for this user.");
        return null;
      }
      
      // Extract the "pushed_at" field from each repository.
      let pushDates = repos
        .filter(repo => repo.pushed_at) // Ensure the field exists
        .map(repo => new Date(repo.pushed_at).getTime());
      
      if (pushDates.length === 0) {
        console.log("No push data available for this user.");
        return null;
      }
      
      // Find the most recent push date.
      let latestPush = new Date(Math.max(...pushDates));
      console.log(`Last commit time for ${username} (based on pushed_at): ${latestPush}`);
      return latestPush;
    } catch (error) {
      console.error("Error fetching last commit time:", error);
      return null;
    }
}
  