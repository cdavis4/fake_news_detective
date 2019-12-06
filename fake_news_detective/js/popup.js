'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
const imgList = ["realIcon", "unknownIcon", "fakeIcon", "baseIcon"];
//const imgList = ["images/real16.png", "images/unknown16.png", "images/fake16.png"];
var imgIndex = 0;

window.onload=function(){
  //let button = document.getElementById('geturl');
  document.getElementById('base-logo').style.display = "block";
  document.getElementById('unknown-logo').style.display = "none";
  document.getElementById('real-logo').style.display = "none";
  document.getElementById('fake-logo').style.display = "none";

  //https://stackoverflow.com/questions/18150774/get-all-keys-from-chrome-storage
      document.getElementById('getUserInfo').addEventListener("click", function(){
        chrome.storage.local.get(['title'], function(curtitle){
        
          let titlehtml = document.getElementById('title');
          titlehtml.innerHTML = curtitle.title;
        });
        chrome.storage.local.get(['email'], function(email){
          let emailhtml = document.getElementById('email');
          emailhtml.innerHTML = email.email;
      
      });
      chrome.storage.local.get(['changeurl'], function(cururl){
        let urlhtml = document.getElementById('current_url');
        urlhtml.innerHTML = cururl.changeurl;
    
    });
    chrome.storage.local.get(['currentDOM'], function(curDom){
      let texthtml = document.getElementById('text');
      texthtml.innerHTML = curDom.currentDOM;
  
  });
    }); 
    document.getElementById('changeIcon').addEventListener("click", function(){
      chrome.storage.local.get('currentIcon', function(filePath){

        console.log(filePath[Object.keys(filePath)[0]].image);
        chrome.browserAction.setIcon({path: filePath[Object.keys(filePath)[0]].image}); 

        let tempString= filePath[Object.keys(filePath)[0]].message;
        chrome.browserAction.setTitle({title:tempString});
      }); 

      imgIndex= (imgIndex+1)%imgList.length;

      chrome.storage.local.get(imgList[imgIndex], function(newPath){
        let tempMessage= newPath[Object.keys(newPath)[0]].message;
        let tempIcon=newPath[Object.keys(newPath)[0]].image;
        console.log(tempMessage);
        console.log(tempIcon);
        chrome.storage.local.set({"currentIcon": {"image":tempIcon,'message':tempMessage}}, function(results) {
          console.log(results);
        
          if (imgList[imgIndex] == "baseIcon"){
            document.getElementById('base-logo').style.display = "none";
            document.getElementById('unknown-logo').style.display = "none";
            document.getElementById('real-logo').style.display = "none";
            document.getElementById('fake-logo').style.display = "block";
          }
          else if (imgList[imgIndex] == "unknownIcon"){
            document.getElementById('base-logo').style.display = "none";
            document.getElementById('unknown-logo').style.display = "none";
            document.getElementById('real-logo').style.display = "block";
            document.getElementById('fake-logo').style.display = "none";
          }
          else if (imgList[imgIndex] == "realIcon"){
            document.getElementById('base-logo').style.display = "block";
            document.getElementById('unknown-logo').style.display = "none";
            document.getElementById('real-logo').style.display = "none";
            document.getElementById('fake-logo').style.display = "none";
          }
          else if (imgList[imgIndex] == "fakeIcon"){
            document.getElementById('base-logo').style.display = "none";
            document.getElementById('unknown-logo').style.display = "block";
            document.getElementById('real-logo').style.display = "none";
            document.getElementById('fake-logo').style.display = "none";
          }
        });
      });
    });  
}
