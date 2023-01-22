const config = {
    apiKey: "AIzaSyAcg30KKYSju6g9BhtvUKlXZJSHKh4lx6U",
    authDomain: "XXXXX",
    databaseURL: "https://ifirerat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ifirerat",
    storageBucket: "tweetgo-main.appspot.com",
    messagingSenderId: "XXXXXX"
}

var defaultApp = firebase.initializeApp(config);
console.log(defaultApp.name);
firebase.auth().signInWithEmailAndPassword("magicph26@gmail.com", "trunks123");

let url = document.location.href;
/*let fetcid = url.slice(url.indexOf("=") + 1);
console.log(fetcid);*/

let pl = new URL(url);
let params = new URLSearchParams(pl.search);
let fetcid = params.get("id");
console.log(fetcid);

function shortUrl(){
	var xuid = generate();
	var postData = {
    Url: fetcid
  };
    
	if(isValidHttpUrl(input)){
		
	const dbRef = firebase.database().ref().child("ShortUrl").child(xuid);
	dbRef.get().then((snapshot) => {
  if (snapshot.exists()) {
	   document.write('invalid');
	 console.log("try again");
  } else {
   //console.log("No data available");
	dbRef.set(postData);
	 document.write('https://iearnmo.cf/q?id=${xuid}');
	 
	/*stats.innerHTML = "https://iearnmo.cf/q?id="+xuid;*/
  }
}).catch((error) => {

  console.error(error);
});
	}else{
	
      
	}
}

function generate() {
	    var n= 6;
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
        
        if ( n > max ) {
                return generate(max) + generate(n - max);
        }
        
        max        = Math.pow(10, n+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;
        
        return ("" + number).substring(add); 
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

shortUrl();
