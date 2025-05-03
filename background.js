chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["script.js"],
  });
});

chrome.runtime.onInstalled.addListener(async () => {
  const { autoPip } = await chrome.storage.local.get({ autoPip: true });
  chrome.contextMenus.create({
    id: "autoPip",
    contexts: ["action"],
    title: "Automatic picture-in-picture (BETA)",
    type: "checkbox",
    checked: autoPip,
  });
  updateContentScripts(autoPip);
});

chrome.runtime.onStartup.addListener(async () => {
  const { autoPip } = await chrome.storage.local.get({ autoPip: true });
  chrome.action.setBadgeBackgroundColor({ color: "#4285F4" });
  chrome.action.setBadgeTextColor({ color: "#fff" });
  updateContentScripts(autoPip);
});

chrome.contextMenus.onClicked.addListener(({ checked: autoPip }) => {
  chrome.storage.local.set({ autoPip });
  updateContentScripts(autoPip);
});

function updateContentScripts(autoPip) {
  chrome.action.setTitle({ title: `Automatic picture-in-picture (${autoPip ? "on" : "off"})` });
  chrome.action.setBadgeText({ text: autoPip ? "★" : "" });
  if (!autoPip) {
    chrome.scripting.unregisterContentScripts({ ids: ["autoPip"] });
    return; chrome.action.onClicked.addListener((currentTab) => {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id, allFrames: true },
        files: ["script.js"],
      });
    });

    chrome.runtime.onInstalled.addListener(async () => {
      const { enableAutoPip } = await chrome.storage.local.get({ enableAutoPip: true });
      chrome.contextMenus.create({
        id: "enableAutoPip",
        contexts: ["action"],
        title: "Auto Picture-in-Picture (BETA)",
        type: "checkbox",
        checked: enableAutoPip,
      });
      refreshContentScripts(enableAutoPip);
    });

    chrome.runtime.onStartup.addListener(async () => {
      const { enableAutoPip } = await chrome.storage.local.get({ enableAutoPip: true });
      chrome.action.setBadgeBackgroundColor({ color: "#34A853" });
      chrome.action.setBadgeTextColor({ color: "#fff" });
      refreshContentScripts(enableAutoPip);
    });

    chrome.contextMenus.onClicked.addListener(({ checked: enableAutoPip }) => {
      chrome.storage.local.set({ enableAutoPip });
      refreshContentScripts(enableAutoPip);
    });

    function refreshContentScripts(enableAutoPip) {
      chrome.action.setTitle({ title: `Auto Picture-in-Picture (${enableAutoPip ? "enabled" : "disabled"})` });
      chrome.action.setBadgeText({ text: enableAutoPip ? "★" : "" });
      if (!enableAutoPip) {
        chrome.scripting.unregisterContentScripts({ ids: ["enableAutoPip"] });
        return;
      }
      chrome.scripting.registerContentScripts([{
        id: "enableAutoPip",
        js: ["autoPip.js"],
        matches: ["<all_urls>"],
        runAt: "document_start"
      }]);
    }

  }
  chrome.scripting.registerContentScripts([{
    id: "autoPip",
    js: ["autoPip.js"],
    matches: ["<all_urls>"],
    runAt: "document_start"
  }])
}
