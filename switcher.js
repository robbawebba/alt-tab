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
    } else { // catches orphan tabs and adds them to the list
		tabs.unshift(id)
    }
    console.log("Tab switch: active=" + id);
        console.log(tabs);
});

chrome.browserAction.onClicked.addListener(function(tab) {
    swapTabs();
});

function swapTabs() {
    chrome.tabs.update(tabs[1], {selected: true});
    console.log("manually swapped tabs!");
    console.log("switching to " + tabs[1]);
    console.log(tabs);
}

chrome.commands.onCommand.addListener(function(command) {
    swapTabs();
});