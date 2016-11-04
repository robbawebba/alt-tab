var storage = chrome.storage.local;
var tabs = [];

chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Tab Created: " + tab.id);
    tabs.push(tab.id);
    console.log(tabs);
});

chrome.tabs.onRemoved.addListener(function (id, removeInfo) {
    var removed = tabs.indexOf(id);
    console.log("removing tab " + id);
    tabs.splice(removed, 1);
});

