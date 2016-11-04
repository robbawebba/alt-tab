var tabs= [];
 
var val = tabs instanceof Array;
console.log(val);

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

chrome.tabs.onActiveChanged.addListener(function(id, selectInfo) {
    var oldLocation = tabs.indexOf(id);
    if (oldLocation > -1)  {
        tabs.splice(oldLocation,1)
        tabs.unshift(id);
        console.log("Tab switch: active=" + id);
        console.log(tabs);
    }
});

chrome.browserAction.onClicked.addListener(swapTabs);

function swapTabs(tab) {
    chrome.tabs.update(tabs[1], {selected: true});
    console.log("manually swapped tabs!");
    console.log("current= " + tab.id + " switching to " + tabs[1]);
    console.log(tabs);
}