// Copyright (c) 2015 Jorel Ali. All rights reserved.

var isRunning = false;
var runningThread = null;

chrome.pageAction.onClicked.addListener(function(tab) {
	if(tab.url.indexOf('facebook') >= 0 && tab.url.indexOf('poke') >= 0) {
		chrome.tabs.executeScript({code: "var runningThread = null"});
		if(isRunning == true) {
			isRunning = false;
			chrome.tabs.executeScript({file: "DisablePoker.js"});
			chrome.pageAction.setIcon({tabId: tab.id, path: "iconOff.png"});
			chrome.pageAction.setTitle({tabId: tab.id, title: "Press to turn auto poker on"});
		} else {
			isRunning = true;
			chrome.tabs.executeScript({file: "EnablePoker.js"});
			chrome.pageAction.setIcon({tabId: tab.id, path:"iconOn.png"});
			chrome.pageAction.setTitle({tabId: tab.id, title: "Press to turn auto poker off"});
		}
	} else {
		alert('You must be on https://www.facebook.com/pokes/ to use this button!');
	}
});

chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(null, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [ new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {
					hostEquals: 'www.facebook.com', 
					urlContains: 'pokes',
					schemes: ['https']
				},
			})],
			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	var tab = chrome.tabs.get(tabId, null);
	if(tab.url.indexOf('facebook') >= 0 && tab.url.indexOf('poke') >= 0) {
		if(isRunning) {
			isRunning = false;
			chrome.pageAction.setIcon({tabId: tab.id, path: "iconOff.png"});
			chrome.pageAction.setTitle({tabId: tab.id, title: "Press to turn auto poker on"});
		}
	}
}
);