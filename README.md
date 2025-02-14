# ⭐ GitHub Friends Extension  

## 📌 Overview  

**GitHub Friends extension** is a Chrome extension that lets you privately "star" GitHub profiles without the followed user being notified. Instead of using GitHub's native follow feature, the extension stores user details locally so you can maintain a private list of GitHub friends. In the popup, you'll see each starred user's full name, nickname, pronouns, and the latest commit time (retrieved from GitHub's API).  

## ✨ Features  

- ⭐ **Private Starring**: Star or unstar a GitHub profile by clicking the star icon injected next to the user's full name.  
- 💾 **Local Storage**: User details (profile URL, nickname, full name, and pronouns) are saved in `chrome.storage.local`.  
- 🏠 **Popup Dashboard**: View your starred users in a stylish, card-based layout with options to visit the profile or remove (unfriend) the user.  
- ⏳ **Last Commit Time**: Retrieve and display each user's latest commit time using the `pushed_at` field from the GitHub API.  

## 📂 File Structure  

- 📜 **`manifest.json`**: Defines the extension's metadata, permissions, and background service worker.  
- 🖥 **`content.js`**: Injects the star icon on GitHub profile pages and handles friend/unfriend toggling.  
- 🎨 **`popup.html`**: The HTML template for the extension popup.  
- 🖌 **`popup.css`**: Styles for the popup, including card layouts and buttons.  
- ⚙ **`popup.js`**: Loads and displays starred user data in the popup; handles user interactions.  
- 🔄 **`background.js`**: Performs API calls to GitHub (using the optimized approach via the `pushed_at` field) to fetch the latest commit time.  

## 🛠 Installation  

### 1️⃣ Clone or Download the Repository  

#### **Option 1: Clone via Git**  
```bash
git clone https://github.com/yourusername/github-friends-extension.git
```

#### **Option 2: Download ZIP**  
- Go to the repository on GitHub.  
- Click the **"Code"** button and select **"Download ZIP"**.  
- Extract the ZIP file to your desired location.  

### 2️⃣ Load the Extension in Chrome  

- Open Chrome and navigate to `chrome://extensions/`.  
- Enable **Developer mode** (toggle in the top right corner).  
- Click on **Load unpacked** and select the directory where you downloaded the extension.  

### 3️⃣ Usage  

- Visit any **GitHub user's profile page**. A **star icon** (☆) will appear next to the user's full name.  
- Click the star icon to **star** (or **unstar**) the profile. The icon will toggle between a **hollow star (☆)** and a **golden star (⭐)**.  
- Click the extension icon in your browser toolbar to **open the popup dashboard**.  
- In the popup, view your **starred users** with their full name, nickname, pronouns, and the **last commit time**.  
- Click the **GitHub icon button** on any user card to **open their profile in a new tab**.  
- Click the **Unfriend** button to remove a user from your starred list.  

## 🚀 GitHub API Rate Limits & Authorized Requests  

By default, the extension makes **unauthorized** API requests, which are limited to **60 requests per hour**.  

For higher rate limits, we can implement **authorized requests** by using a **GitHub Personal Access Token (PAT)**. Authorized requests significantly increase the rate limit (**up to 5,000 requests per hour or more**) and can access any public data, including the last push time for any user's repository.  

⚠ *Note: Implementing authenticated API requests is a future enhancement.*  

## 🔮 Future Enhancements  

- 🔑 **Integrate Authorized Requests**: Allow users to provide a **GitHub Personal Access Token (PAT)** to bypass the **60 requests per hour** limit.  
- 🚨 **Enhanced Error Handling**: Better notify users when API limits are reached or other errors occur.  
- 🏆 **Additional User Data**: Fetch more details about starred users for a richer experience.  

## 🤝 Contributing  

Contributions, bug reports, and feature requests are welcome! Feel free to **open an issue** or **submit a pull request**.
