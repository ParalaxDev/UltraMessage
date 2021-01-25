var theme = "light";


function updatePass(tokenName){
	if (theme == "dark"){
		document.getElementById(tokenName + "Input").setAttribute("style", "border-color:rgb(12, 232, 77); color:rgb(12, 232, 77); background-color:rgb(0, 0, 0)");
	}
	else if (theme == "light"){
		document.getElementById(tokenName + "Input").setAttribute("style", "border-color:rgb(12, 232, 77); color:rgb(12, 232, 77); background-color:rgb(255, 255, 255)");
	}
	document.getElementById(tokenName + "Label").setAttribute("style", "color:rgb(12, 232, 77)");
	document.getElementById(tokenName + "Error").setAttribute("style", "display:none");
}
function updateError(tokenName){
	if (theme == "dark"){
		document.getElementById(tokenName + "Input").setAttribute("style", "border-color:rgb(255, 0, 0); color:rgb(255, 0, 0); background-color:rgb(0, 0, 0)");
	}
	else if (theme == "light"){
		document.getElementById(tokenName + "Input").setAttribute("style", "border-color:rgb(255, 0, 0); color:rgb(255, 0, 0); background-color:rgb(255, 255, 255)");
	}
	document.getElementById(tokenName + "Label").setAttribute("style", "color:rgb(255, 0, 0)");
	document.getElementById(tokenName + "Error").setAttribute("style", "display:inline-block");
}
function updateNeutral(tokenName){
	if (theme == "light"){
		document.getElementById(tokenName + "Input").setAttribute("style", "border-color:rgb(0, 0, 0);color:rgb(0, 0, 0); background-color:rgb(255, 255, 255)");
		document.getElementById(tokenName + "Label").setAttribute("style", "color:rgb(0, 0, 0)");
		document.getElementById(tokenName + "Error").setAttribute("style", "display:none");
	}
	else if (theme == "dark"){
		document.getElementById(tokenName + "Input").setAttribute("style", "border-color:rgb(255, 255, 255);color:rgb(255, 255, 255); background-color:rgb(0, 0, 0)");
		document.getElementById(tokenName + "Label").setAttribute("style", "color:rgb(255, 255, 255)");
		document.getElementById(tokenName + "Error").setAttribute("style", "display:none");
	}
	
}

let loginArray = ["", ""];
let trackArray = ["n", "n"];
let seqArray = ["username", "password"];
function back(){
	location.href = "index.html";
}
function signIn(username, theme){
	sessionStorage.setItem("USERNAME", username);
	sessionStorage.setItem("THEME", theme);
	location.href= "homepage.html";
}
function checkPassword(){
	var ek = "-";
	var i = 0;
	var username = loginArray[0];
	for (i=0;i<username.length;i++){
		ek += (username[i].charCodeAt()).toString();
		ek += "-";
	}

	var password = document.getElementById("passwordInput").value;
	
	if (password == ""){
		updateNeutral("password");
		trackArray[1] = "n"; 
		loginArray[1] = "";   
		return;
	}

	firebase.database().ref("User Accounts").on("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var values = childSnapshot.val()
			var username = loginArray[0];
			var currentUsername = values["username"];
			if (currentUsername == username){
				if (password == decrypt(values["password"], ek)){
					//login accepted
					updatePass("password");
					var theme = values["theme"];
					loginArray[1] == "password";
					trackArray[1] == "p";
					signIn(username, theme);
					return;
				}
				else{
					//invalid details
					updateError("password");
					loginArray[1] == "";
					trackArray[1] == "e";
					return;
				}
			}
		});	
	});
}

function checkUsername(){
	var username = document.getElementById("usernameInput").value;
	var ek = "-";
	var i = 0;
	for (i=0;i<username.length;i++){
		ek += (username[i].charCodeAt()).toString();
		ek += "-";
	}

	if (username == ""){
		updateNeutral("username");
		trackArray[0] = "n"; 
		loginArray[0] = "";   
		return;
	}
	let totalUsernames = [];
	firebase.database().ref("User Accounts").on("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			totalUsernames.push((childSnapshot.val())["username"]);
			if (username == childSnapshot.val()["username"]){
				var theme = decrypt(childSnapshot.val()["theme"], ek);
				if (theme == "dark"){
					document.getElementById("themeCheckbox").checked = true;
				}
				else if (theme == "light"){
					document.getElementById("themeCheckbox").checked = false;
				}
				checkMode();

			}
			
		});
		if (totalUsernames.includes(username) == true){
			loginArray[0] = username;
			trackArray[0] = "p";
			updatePass("username");
			document.getElementById("passwordDIV").style.display = "block";
			document.getElementById("passwordInput").focus();
			document.getElementById("submitButton").style.display ="block";
			return;
		}
		else{
			loginArray[0] = "";
			trackArray[0] = "e";
			updateError("username");
			return;
		}
	});

}
function checkMode(){
	var status = document.getElementById("themeCheckbox").checked;
	if (status == true){
		//dark mode
		theme = "dark";

		document.getElementById("mainDIV").setAttribute("style", "background-color:rgb(0, 0, 0)");
		document.getElementById("mainTitle").setAttribute("style", "color:rgb(255, 255, 255)");
		document.getElementById("darkModeSwitch").setAttribute("style", "color:rgb(255, 255, 255)");

		var i = 0;
		for (i=0; i<trackArray.length;i++){
			var currentStat = trackArray[i];
			var currentToken = seqArray[i];
			if (currentStat == "p"){
				updatePass(currentToken);
			}
			else if (currentStat == "e"){
				updateError(currentToken);
			}
			else if (currentStat == "n"){
				updateNeutral(currentToken);
			}

		}
	}
	else if (status == false){
		//light modes

		theme = "light";
		document.getElementById("mainDIV").setAttribute("style", "background-color:rgb(255, 255, 255)");
		document.getElementById("mainTitle").setAttribute("style", "color:rgb(0, 0, 0)");
		document.getElementById("darkModeSwitch").setAttribute("style", "color:rgb(0, 0, 0)");

		var i = 0;
		for (i=0; i<trackArray.length;i++){
			var currentStat = trackArray[i];
			var currentToken = seqArray[i];
			if (currentStat == "p"){
				updatePass(currentToken);
			}
			else if (currentStat == "e"){
				updateError(currentToken);
			}
			else{
				updateNeutral(currentToken);
			}

		}
	}
}


var username = document.getElementById("usernameInput");
var password = document.getElementById("passwordInput");
username.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        checkUsername();
    }
});
password.addEventListener("keydown", function (e) {
	if (e.keyCode === 13){
		checkPassword();
	}
});
