var storage = chrome.storage.local;
var saveData = {"tabIDs": []};

chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Tab Created: " + tab.id);
    saveData.tabIDs.push(tab.id.toString());
    saveIDs();
    console.log(saveData.tabIDs);
    getIDs();
});

function getIDs() {
    storage.get('tabIDs', function(result) {
      console.log("IDs retrieved:");
      console.log(result.tabIDs);
      saveData = result;
    });
}

function saveIDs() {
    storage.set(saveData, function() {
      console.log("IDs Saved:");
      console.log(saveData.tabIDs);
    });
}

