'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
const imgList = ["baseIcon","realIcon", "unknownIcon", "fakeIcon"];
//const imgList = ["images/real16.png", "images/unknown16.png", "images/fake16.png"];
var imgIndex = 0;

function displayIcon(tempPath)
{
  if (tempPath == "images/fake16.png"){
    document.getElementById('base-logo').style.display = "none";
    document.getElementById('unknown-logo').style.display = "none";
    document.getElementById('real-logo').style.display = "none";
    document.getElementById('fake-logo').style.display = "block";
  }
  else if (tempPath == "images/real16.png"){
    document.getElementById('base-logo').style.display = "none";
    document.getElementById('unknown-logo').style.display = "none";
    document.getElementById('real-logo').style.display = "block";
    document.getElementById('fake-logo').style.display = "none";
  }
  else if (tempPath == "images/base16.png"){
    document.getElementById('base-logo').style.display = "block";
    document.getElementById('unknown-logo').style.display = "none";
    document.getElementById('real-logo').style.display = "none";
    document.getElementById('fake-logo').style.display = "none";
  }
  else if (tempPath == "images/unknown16.png"){
    document.getElementById('base-logo').style.display = "none";
    document.getElementById('unknown-logo').style.display = "block";
    document.getElementById('real-logo').style.display = "none";
    document.getElementById('fake-logo').style.display = "none";
  }
}

window.onload=function(){
  //let button = document.getElementById('geturl');

  chrome.storage.local.get('pastIcon', function(filePath){
    let newPath = filePath[Object.keys(filePath)[0]].image
    /*if(newPath=="images/fake16.png"){newPath="images/unknown16.png";}
    else if(newPath=="images/real16.png"){newPath="images/base16.png";}
    else if(newPath=="images/base16.png"){newPath="images/fake16.png";}
    else if(newPath=="images/unknown16.png"){newPath="images/real16.png";}*/
    displayIcon(newPath);
  });

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

        
        let tempMessage= filePath[Object.keys(filePath)[0]].message;
        let tempIcon=filePath[Object.keys(filePath)[0]].image;
        chrome.storage.local.set({"pastIcon": {"image":tempIcon,'message':tempMessage}}); 
      

        imgIndex= (imgIndex+1)%imgList.length;

        chrome.storage.local.get(imgList[imgIndex], function(newPath){
          let tempMessage= newPath[Object.keys(newPath)[0]].message;
          let tempIcon=newPath[Object.keys(newPath)[0]].image;
          console.log(tempMessage);
          console.log(tempIcon);
          chrome.storage.local.set({"currentIcon": {"image":tempIcon,'message':tempMessage}}, function(results) {
          console.log(results);
          });
        });

        displayIcon(filePath[Object.keys(filePath)[0]].image);

        console.log(filePath[Object.keys(filePath)[0]].image);
        chrome.browserAction.setIcon({path: filePath[Object.keys(filePath)[0]].image}); 

        let tempString= filePath[Object.keys(filePath)[0]].message;
        chrome.browserAction.setTitle({title:tempString});

        

      }); 

      
    });  
}
