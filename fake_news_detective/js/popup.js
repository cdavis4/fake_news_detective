'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
const imgList = ["images/real16.png", "images/unknown16.png", "images/fake16.png"];
var imgIndex = 0;

window.onload=function(){
  //let button = document.getElementById('geturl');

  //https://stackoverflow.com/questions/18150774/get-all-keys-from-chrome-storage
      document.getElementById('getUserInfo').addEventListener("click", function(){
        chrome.storage.local.get(['userid'], function(userid){
        
          let idhtml = document.getElementById('id');
          idhtml.innerHTML = userid.userid;
        });
        chrome.storage.local.get(['email'], function(email){
          let emailhtml = document.getElementById('email');
          emailhtml.innerHTML = email.email;
      
      });
      chrome.storage.local.get(['changeurl'], function(cururl){
        let urlhtml = document.getElementById('current_url');
        urlhtml.innerHTML = cururl.changeurl;
    
    });
    }); 
    document.getElementById('changeIcon').addEventListener("click", function(){
      chrome.storage.local.get('currentIcon', function(filePath){
        console.log(filePath[Object.keys(filePath)[0]]);
        chrome.browserAction.setIcon({path: filePath[Object.keys(filePath)[0]]});  
      }); 
      imgIndex= (imgIndex+1)%imgList.length;

      //this acts as the driver that changes the local storage currentIcon in the same way the background threads would
      chrome.storage.local.set({"currentIcon": imgList[imgIndex]},
      function (){
        console.log("Changed the current icon.")
  
      });
    });  
}
