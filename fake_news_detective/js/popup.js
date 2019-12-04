'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
const imgList = ["realIcon", "unknownIcon", "fakeIcon"];
//const imgList = ["images/real16.png", "images/unknown16.png", "images/fake16.png"];
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
        console.log(filePath[Object.keys(filePath)[0]].image);
        chrome.browserAction.setIcon({path: filePath[Object.keys(filePath)[0]].image});  
      }); 

      chrome.storage.local.get(imgList[imgIndex], function(messagePath){
        let tempString= messagePath[Object.keys(messagePath)[0]].message;
        chrome.browserAction.setTitle({title:tempString});
      });

      imgIndex= (imgIndex+1)%imgList.length;

      chrome.storage.local.get("currentIcon", function(updatePath){
        console.log(updatePath);
      });

      chrome.storage.local.set({"currentIcon":{"image":"images/unknown16.png", "message":"The articles status is unknown"}});

      chrome.storage.local.get("currentIcon", function(updatePath){
        console.log(updatePath);
      });

      /*chrome.storage.local.get("currentIcon", function(updatePath){
        console.log(updatePath);
        chrome.storage.local.get(updatePath[Object.keys(updatePath)[0]], function(secondPath){
          
          console.log(secondPath);
          chrome.storage.local.get({secondPath[Object.keys(secondPath)[0]]:"images/unknown16.png"});
          console.log(secondPath);
        });


      });
      
      /*
      chrome.storage.local.get(imgList[imgIndex], function(updatePath){

        let throwAway = "";
        let tempValues = throwAway.concat("{\"image\":\"", updatePath[Object.keys(updatePath)[0]].image, "\", message:\"", updatePath[Object.keys(updatePath)[0]].message, "\"}");
        let temp = JSON.parse(tempValues);
        chrome.storage.local.set({"currentIcon": temp});
        console.log(updatePath);

        chrome.storage.local.get("currentIcon", function(secondPath){
          console.log(secondPath);
        });
        /*function (){
          console.log("Changed the current icon.")
        });
      });*/


      //this acts as the driver that changes the local storage currentIcon in the same way the background threads would
      /*chrome.storage.local.set({"currentIcon": imgList[imgIndex]},
      function (){
        console.log("Changed the current icon.")
  
      });*/
     /* chrome.storage.local.set({"currentIcon": chrome.storage.local.get(imgList[imgIndex], function(filePath2){
        return 

      }),*/

    });  
}
