# Picture-in-Picture Extension

You can use this extension directly in your browser by installing it from your local Chrome Extension manager.

---

## 📑 Index

- [Description](#description)
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Functionalities](#functionalities)
- [How to Install](#how-to-install)
- [Help](#help)
- [Developer Information](#developer-information)

---

## 📌 Description

The Picture-in-Picture Extension allows users to watch videos in a floating mini window while continuing to browse other tabs. This enhances multitasking and keeps your favorite videos always visible.

---

## 🎯 Introduction

This Chrome extension is a lightweight tool that enables automatic or manual activation of Picture-in-Picture (PiP) mode for online videos. With a clean user experience and built using modern JavaScript and the Chrome Extensions API, it simplifies how users manage media playback in the browser.

---

## 🗂 Project Structure

```
/Picture-in-Picture-Extension
│
├── background.js         // Handles extension events and context menu
├── autoPip.js            // Logic for automatic PiP detection and switching
├── script.js             // Manual PiP script triggered by browser action
├── manifest.json         // Extension metadata and permissions
├── assets/
│   ├── icon19.png
│   ├── icon38.png
│   └── icon128.png
└── README.md             // Project documentation
```

---

## 🛠 Technologies Used

- **JavaScript**: Core logic and Chrome API usage
- **HTML/CSS**: Popup and content structure (if needed)
- **Chrome Extensions API**: For scripting, context menus, and UI integration

---

## 🚀 Functionalities

- Automatically detects and enables PiP for the largest playing video
- Manual activation of PiP via browser action icon
- Context menu toggle to enable/disable Auto PiP feature
- Badge display to show current state (★ for active PiP)

---

## 📥 How to Install

1. Clone the repository or download the ZIP file.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode** using the toggle at the top-right.
4. Click **Load unpacked** and select the folder containing your extension files.
5. The extension will appear in your toolbar—click the icon to start using it!

---

## 🆘 Help

For support or queries, feel free to contact:

📧 Email: [yachanamahant@gmail.com](mailto:yachanamahant@gmail.com)

---

## 👩‍💻 Developer Information

**Developer**: Yachana Mahant  
**Email**: yachanamahant@gmail.com
