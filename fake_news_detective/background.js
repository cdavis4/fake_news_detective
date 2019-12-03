// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {

    chrome.storage.local.set({"realIcon":"images/real16.png", "unknownIcon":"images/unknown16.png", "fakeIcon":"images/fake16.png"}, function() {
      console.log("Added all icons to background storage.");
    });

    chrome.storage.local.set({"currentIcon":"images/real16.png"}, function (){
      console.log("Set the current Icon.")

    });

    console.log('Im the background script');
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
            let user_id = data['names'][0]['metadata']['source']['id'];
            let email = data['emailAddresses'][0]['value'];
            chrome.storage.local.set({"userid": user_id,'email':email}, function() {
              console.log('userid : ' + user_id + ',email: ' + email);
            });
          })
          .catch(error => { callback(error,null)});
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

//let request = JSON.stringify(data);
//console.log(request)
//let user_id = request['names'][0]['metadata']['source']['id'];
//console.log(user_id);

///https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
        chrome.storage.local.set({"changeurl": changeInfo.url}, function() {
          console.log('changeurl: ' + changeInfo.url);
        });
  }
});




