

var getURL = function() {
    var loc = window.location.href;
    alert(loc)
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    alert(window.location.href);
 })