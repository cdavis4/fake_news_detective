// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
var regbutton = document.getElementById('regbutton');

regbutton.onclick = function(element) {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.value = window.location.href;
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    var url_host = new URL(tabs[0].url)
    if (url.hostname != 'google.com')
      {
        alert(window.location.href);
      }
  }
});