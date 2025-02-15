let lastToken = null;

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    const cpAuthHeader = details.requestHeaders.find(
      header => header.name.toLowerCase() === 'cp-authorization'
    );

    if (cpAuthHeader) {
      lastToken = cpAuthHeader.value;
      chrome.storage.local.set({ 'cpToken': lastToken });
      
      chrome.action.setBadgeText({ text: "✓" });
      chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });
    }
  },
  { urls: ["*://classpass.com/*"] },
  ["requestHeaders"]
);