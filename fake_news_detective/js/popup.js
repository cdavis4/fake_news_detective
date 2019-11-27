'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
let button = document.getElementById('geturl');

button.addEventListener ("click", function()
 {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.value = window.location.href;
});

