// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('Im the background script');
  });
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    
    fetch(
      'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses&key=AIzaSyD5xMcNJynDl_3plmoELw4mDWFwFxInZ6k',
      init)
      .then((response) => response.json())
      .then(function(data) {
        console.log(data)
      });

  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

///https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {

        console.log("in changed url");
        console.log(changeInfo.url);
        chrome.identity.getAuthToken({interactive: true}, function(token) {
          let init = {
            method: 'GET',
            async: true,
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            'contentType': 'json'
          };
          
          fetch(
            'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses&key=AIzaSyD5xMcNJynDl_3plmoELw4mDWFwFxInZ6k',
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(data)
            });
      
        });

  }
});




