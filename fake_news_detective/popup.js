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
var button = document.getElementById('geturl');

button.onclick = function(element) {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.value = window.location.href;
};
