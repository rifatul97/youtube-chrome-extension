// 'use strict';
// import {tabUtil} from './tabUtils.js'


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "REMOVE_CURRENT_TAB") {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome.tabs.remove(sender.tab.id);
        });
    }
})
