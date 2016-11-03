var storage = chrome.storage.local;
var saveData = {"tabIDs": []};

chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Tab Created: " + tab.id);
});

