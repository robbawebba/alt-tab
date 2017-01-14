var tabs= [];
var currentWindow = null;

// User creates a new Tab
chrome.tabs.onCreated.addListener(function(tab) {
    tabs.push(tab.id);
    updateTabs();
});

// User deletes a Tab
chrome.tabs.onRemoved.addListener(function (id, removeInfo) {
    var removed = tabs.indexOf(id);
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
    updateTabs();
});

// Click handler for tab icon
chrome.browserAction.onClicked.addListener(function(tab) {
    swapTabs(1);
});

// Swaps current tab with the nth most recent tab
function swapTabs(tabArr, n) {
    chrome.tabs.update(tabArr[n], {active: true});
    updateTabs();
}
// Handle Alt+[1,2] and Ctrl+[Right,Left] commands
chrome.commands.onCommand.addListener(function(command) {
    if(command === "arrowLeft" | command === "arrowRight") { // Ctrl+[Right,Left]
        chrome.windows.getCurrent({populate: true}, function(currentWindow) {
            if (window.id != currentWindow) {
                currentWindow = window.id;
                updateTabs();
            }
            swapTabs(window.tabs, 1);
        });
    } else { // Alt+[1,2]
        tabMultiplier = Number(command.charAt(command.length-1));
        swapTabs(tabs, tabMultiplier);
    }
});

// Gathers all tabs missing from the 'tabs' array and pushes them on the back
// (e.g. tabs that Google spawns in the background)
function updateTabs() {         
    var newTabs = [];
    chrome.tabs.query({currentWindow: true},function(tabArr) {
        currentWindow = tabArr[1].windowId;
        tabArr.map(function(tab) {
            newTabs.push(tab.id);
        });
        newTabs.map(function(tab){
            if(tabs.lastIndexOf(tab)==-1) {
                tabs.push(tab);
            } 
        });
    });
}