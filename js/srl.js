'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});


let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
console.log(fetcid);



var urlLong = "";

const hcaptcha = () => {
  return `<p class="section-subtitle">Please check the captcha box to proceed to the destination page.</p>`;
};

const mainUi = () => {
  return `<input class="btn btn-primary" id="getlink" type="Submit" value="GET LINK"  disabled/>
    `;
};

const hcaptchas = (sec) => {
  return `<p class="section-subtitle">${
               sec
             } seconds</p>`;
};

function eventFunc() {
	var hcaptchaVal = document.querySelector('[name="h-captcha-response"]').value;
   if (hcaptchaVal === "") {
      
      alert("Please complete the hCaptcha");
   }else{
      if(urlLong === ""){
		  alert("Url not exist");
	  }else{
      window.location.href = urlLong;
	  }
   }
    /*window.location.href = urlLong;*/
	}
	
var seconds = 20;
      function countdown() {
        seconds--;
        if (seconds < 0) {
			
			document.getElementById("timer").innerHTML = hcaptcha ();
			document.getElementById("mainui").innerHTML = mainUi();
			var btn = document.getElementById("getlink")
			btn.disabled = false;
			console.log(urlLong);
			document.getElementById("getlink").addEventListener("click", eventFunc);
            } else {
		    document.getElementById("timer").innerHTML = hcaptchas(seconds);
           setTimeout(countdown, 1000);
		  
        }
		
		
      }
      
function setup() {
	countdown();
	/*document.querySelector("#holla").addEventListener("submit", function(event) {

   var hcaptchaVal = document.querySelector('[name="h-captcha-response"]').value;
   if (hcaptchaVal === "") {
      event.preventDefault();
      alert("Please complete the hCaptcha");
   }else{
      window.location.href = urlLong;
   }
});*/
}
	  

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAcg30KKYSju6g9BhtvUKlXZJSHKh4lx6U",
    authDomain: "XXXXX",
    databaseURL: "https://ifirerat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ifirerat",
    storageBucket: "tweetgo-main.appspot.com",
    messagingSenderId: "XXXXXX"
}

var defaultApp = firebase.initializeApp(config);
var database = firebase.database();
console.log(defaultApp.name);
const dbRef = firebase.database().ref();
/*dbRef.child("Users").on("value", function(snapshot) {
  console.log("There are "+snapshot.numChildren()+" messages");
})*/
//console.log(dbRef.child("Users").numChildren());
dbRef.child("ShortUrl").child(fetcid).get().then((snapshot) => {
  if (snapshot.exists()) {
	 console.log("User: "+snapshot.child("Uid").val());
    console.log("Long Url:" +snapshot.child("Url").val());
	if(snapshot.child("Url").exists()){
	     urlLong = snapshot.child("Url").val();
	}else{
	     urlLong = "";
	}
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

function submitView(usid){
	dbRef.child("Users")child(usid).child("Views").get().then((snapshot) => {
  if (snapshot.exists()) {
     
  } else {
     snapshot.ref().set("1");
  }
}).catch((error) => {
  console.error(error);
});
}

window.onload = function () {
    // web page is loaded
setup();
}



