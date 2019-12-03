'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/

const imgList = ["images/real16.png", "images/unknown16.png", "images/fake16.png"]//, "images/base32.png"];
var imgIndex = 0;

window.onload=function(){
  
  
  let button = document.getElementById('geturl');

  button.addEventListener ("click", function() {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.value = window.location.href;


  });

  document.getElementById('changeIcon').addEventListener("click", function(){

    let i = imgList[imgIndex];
    console.log(i);
    chrome.browserAction.setIcon({path: imgList[imgIndex]});
    imgIndex= (imgIndex+1)%imgList.length;
  });
  


}
