var storage = chrome.storage.local;
var tabs = {"ids": []};

chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Tab Created: " + tab.id);
    tabs.ids.push(tab.id.toString());
    saveIDs();
    console.log(tabs.ids);
    getIDs();
});

function getIDs() {
    storage.get('ids', function(result) {
      console.log("IDs retrieved:");
      console.log(result.ids);
      tabs = result;
    });
}

function saveIDs() {
    storage.set(tabs, function() {
      console.log("IDs Saved:");
      console.log(tabs.ids);
    });
}

