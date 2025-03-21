document.getElementById("downloadBtn").addEventListener("click", async () => {
  console.log("Download button clicked");

  try {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log("Current tab:", tab);

    if (!tab) {
      throw new Error("No active tab found");
    }

    // Send message to background script
    console.log("Sending message to background script");
    const response = await chrome.runtime.sendMessage({
      action: "generatePDF",
      tabId: tab.id,
    });
    console.log("Received response from background script:", response);

    if (response && response.status === "success") {
      console.log("PDF generation initiated successfully");
    } else {
      console.error("PDF generation failed:", response);
    }
  } catch (error) {
    console.error("Error in popup:", error);
  }
});

//background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: extractAndDownload,
    });
  }
});
