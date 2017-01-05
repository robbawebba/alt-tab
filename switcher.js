var tabs= [];
 
var val = tabs instanceof Array;
console.log(val);

// User creates a new Tab
chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Tab Created: " + tab.id);
    tabs.push(tab.id);
    console.log(tabs);
    updateTabs();
});

// User deletes a Tab
chrome.tabs.onRemoved.addListener(function (id, removeInfo) {
    var removed = tabs.indexOf(id);
    console.log("removing tab " + id);
    tabs.splice(removed, 1);
    updateTabs();
});

// User switches tabs
chrome.tabs.onActiveChanged.addListener(function(id, selectInfo) {
    var oldLocation = tabs.indexOf(id);
    if (oldLocation > -1)  { // if we already know about this tab
        tabs.splice(oldLocation,1)
        tabs.unshift(id);
    } else { // catches orphan tabs and adds them to the list
		tabs.unshift(id)
    }
    console.log("Tab switch: active=" + id);
    console.log(tabs);
    updateTabs();
});

// Click handler for tab icon
chrome.browserAction.onClicked.addListener(function(tab) {
    swapTabs(1);
});

// Swaps current tab with the nth most recent tab
function swapTabs(n) {
    console.log("manually swapped tabs!");
    console.log("switching to " + tabs[n]);
    chrome.tabs.update(tabs[n], {active: true});
    console.log(tabs);
    updateTabs();
}
// Handle alt+[1-3] swapping commands
chrome.commands.onCommand.addListener(function(command) {
    tabMultiplier = Number(command.charAt(command.length-1));
    console.log("tabMultiplier: " + String(tabMultiplier));
    swapTabs(tabMultiplier);
});

function updateTabs() {
    console.log("in UpdateTabs...");
    console.log(tabs);
    var newTabs = [];
    chrome.tabs.query({currentWindow: true},function(tabArr) {
        console.log(tabArr);
        tabArr.map(function(tab) {console.log(tab.id);newTabs.push(tab.id);});
    });
    console.log("newTabs:::");
    console.log(newTabs);
    newTabs.map(function(tab){if(tabs.lastIndexOf(tab)==-1) tabs.push(tab);});
}