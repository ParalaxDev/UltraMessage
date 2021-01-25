let verifArray = [
 ["Forename:", ""],
 ["Surname:", ""],
 ["DOB:", ""], 
 ["Gender:", ""], 
 ["Username:", ""], 
 ["Password:", ""], 
 ["Country:", ""],
 ];
let trackArray = [
	"n",
	"n",
	"n",
	"n",
	"n",
	"n",
	"n",
	"n",
];
let seqArray = ["forename", "surname", "dob", "gender", "username", "password1", "password2", "country"];
var theme = "light";

var tempPassword = false;
let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specArray = ["~", ":", "'", "+", "[", "\\", "@", "^", "{", "%", "(", "-", '"', "*", "|",",", "&", "<", "`", "}", ".", "_", "=", "]", "!", ">", ";", "?", "#", "$", ")", "/"];
let lowerCaseArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let upperCaseArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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




function checkForename(){
	var name = (document.getElementById("forenameInput").value).toLowerCase();
	if (name == ""){
		verifArray[0][1] = "";
		updateNeutral("forename");
		trackArray[0] = "n";
		return 0;
	}
	var valid = true;
	var i = 0;
	for (i=0; i<name.length;i++){
		var currentLetter = name[i];
		if (isCharacterALetter(currentLetter) == false){
			valid = false;
			break;
		}
	}
	if (valid == true){
		updatePass("forename");
		trackArray[0] = "p";
		document.getElementById("forenameInput").value = toTitleCase(name);
		verifArray[0][1] = toTitleCase(name);
	}
	else if (valid == false){
		updateError("forename");
		verifArray[0][1] = "";
		trackArray[0] = "e";
	}
	
}
function checkSurname(){
	var name = (document.getElementById("surnameInput").value).toLowerCase();
	if (name == ""){
		verifArray[1][1] = "";
		updateNeutral("surname");
		trackArray[1] = "n";
		return 0;
	}
	var valid = true;
	var i = 0;
	for (i=0; i<name.length;i++){
		var currentLetter = name[i];
		if (isCharacterALetter(currentLetter) == false){
			valid = false;
			break;
		}
	}
	if (valid == true){
		updatePass("surname");
		trackArray[1] = "p";
		document.getElementById("surnameInput").value = toTitleCase(name);
		verifArray[1][1] = toTitleCase(name);
		
	}
	else if (valid == false){
		updateError("surname");
		trackArray[1] = "e";
		verifArray[1][1] = "";

	}
}
function checkDOB(){
	var date = (document.getElementById("dobInput").value).toString();
	if (date == ""){
		verifArray[2][1] = "";
		updateNeutral("dob");
		trackArray[2] = "n";
		return 0;
	}
	var valid = true;
	if (date.length != 10){
		valid = false;
	}
	var date = (date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4));

	if (isFutureDate(date) == true){
		valid = false;
	}

	if (valid == true){
		updatePass("dob");
		trackArray[2] = "p";
		verifArray[2][1] = date;
	
	}
	else if (valid == false){
		updateError("dob");
		trackArray[2] = "e";
		verifArray[2][1] = "";

	}
	
}
function checkGender(){
	var state1 = document.getElementById("male").checked;
	var state2 = document.getElementById("female").checked;
	var state3 = document.getElementById("other").checked;
	var gender = "";
	if (state1 == true){
		gender = "Male";
	}
	else if (state2 == true){
		gender = "Female";
	}
	else if (state3 == true){
		gender = "Other";
	}
	else{
		document.getElementById("genderLabel").setAttribute("style", "color:rgb(255, 0, 0)");
		document.getElementById("genderError").setAttribute("style", "display:inline-block");
		document.getElementById("maleText").setAttribute("style", "color:rgb(255, 0, 0)");
		document.getElementById("femaleText").setAttribute("style", "color:rgb(255, 0, 0)");
		document.getElementById("otherText").setAttribute("style", "color:rgb(255, 0, 0)");
		trackArray[3] = "e";
		verifArray[3][1] = "";
		return 0;
	}
	document.getElementById("genderLabel").setAttribute("style", "color:rgb(12, 232, 77)");
	document.getElementById("maleText").setAttribute("style", "color:rgb(12, 232, 77)");
	document.getElementById("femaleText").setAttribute("style", "color:rgb(12, 232, 77)");
	document.getElementById("otherText").setAttribute("style", "color:rgb(12, 232, 77)");
	document.getElementById("genderError").setAttribute("style", "display:none");
	trackArray[3] = "p";

	verifArray[3][1] = gender;
}
function checkUsername(){
	var username = document.getElementById("usernameInput").value;
	if (username == ""){
		verifArray[4][1] = "";
		updateNeutral("username");
		trackArray[4] = "n";
		return 0;
	}
	let takenUsernamesArray = [];
	firebase.database().ref("User Accounts").on("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			takenUsernamesArray.push((childSnapshot.val())["username"]);
		});
	
		if (takenUsernamesArray.includes(username) == true){
			updateError("username");
			trackArray[4] = "e";
			verifArray[4][1] = "";
		}
		else{
			updatePass("username");
			trackArray[4] = "p";
			verifArray[4][1] = username;
		}
	});
}
function checkPassword1(){
	var p1 = document.getElementById("password1Input").value;
	var valid = true;
	if (p1 == ""){
		verifArray[5][1] = "";
		updateNeutral("password1");
		trackArray[5] = "n";
		return 0;
	}
	if (p1.length < 7){
		valid = false;
	}
	else{
		var i = 0;
		var numIncluded = false;
		var uppercaseIncluded = false;
		var lowercaseIncluded = false;
		for (i=0;i<p1.length;i++){
			currentLetter = p1[i];
			if (numArray.includes(currentLetter) == true){
				numIncluded = true;
			}
			if (upperCaseArray.includes(currentLetter) == true){
				uppercaseIncluded = true;
			}
			if (lowerCaseArray.includes(currentLetter) == true){
				lowercaseIncluded = true;
			}
		}
		if ((numIncluded==true) && (uppercaseIncluded==true) && (lowercaseIncluded==true)){
			valid = true;		}
		else{
			valid = false;
		}
	}
	
	if (valid == true){
		tempPassword = true;
		updatePass("password1");
		trackArray[5] = "p";
		
	}
	else{
		alert("This password does not meet the criteria:\n - Your password must be above 6 characters in length.\n - Your password must contain at least 1 upper case letter.\n - Your password must also contain at least 1 lower case letter.");

		updateError("password1");
		trackArray[5] = "e";
	}	
}
function checkPassword2(){
	var p1 = document.getElementById("password1Input").value;
	var p2 = document.getElementById("password2Input").value;
	if (p2 == "" || p1 == ""){
		verifArray[5][1] = "";
		updateNeutral("password2");
		trackArray[6] = "n";
		return 0;
	}
	if (p1 == p2 && tempPassword == true){
		verifArray[5][1] = p2;
		updatePass("password2");
		trackArray[6] = "p";
	}
	else{
		updateError("password2")
		trackArray[6] = "e";
	}
}
function checkCountry(){
	var country = document.getElementById("countries").value;
	if (country == "YetToSelect"){
		verifArray[6][1] = "";
		if (theme == "dark"){
			document.getElementById("countries").setAttribute("style", "border-color:rgb(255, 0, 0); color:rgb(255, 0, 0);background-color:rgb(0, 0, 0)");
		}
		else if (theme == "light"){
			document.getElementById("countries").setAttribute("style", "border-color:rgb(255, 0, 0); color:rgb(255, 0, 0); background-colorrgb(255, 255, 255)");
		}
		document.getElementById("countryLabel").setAttribute("style", "color:rgb(255, 0, 0)");
		document.getElementById("countryError").setAttribute("style", "display:inline-block");
		trackArray[7] = "e";

	}

	verifArray[6][1] = country;
	if (theme == "dark"){
		document.getElementById("countries").setAttribute("style", "border-color:rgb(12, 232, 77); color:rgb(12, 232, 77);background-color:rgb(0, 0, 0)");
	}
	else if (theme == "light"){
		document.getElementById("countries").setAttribute("style", "border-color:rgb(12, 232, 77); color:rgb(12, 232, 77); background-colorrgb(255, 255, 255)");
	}
	
	document.getElementById("countryLabel").setAttribute("style", "color:rgb(12, 232, 77)");
	document.getElementById("countryError").setAttribute("style", "display:none");
	trackArray[7] = "p";
}
function checkMode(){
	var status = document.getElementById("themeCheckbox").checked;
	if (status == true){

		theme = "dark";
		//darkmode
		document.getElementById("mainDIV").setAttribute("style", "background-color:rgb(0, 0, 0)");
		document.getElementById("mainTitle").setAttribute("style", "color:rgb(255, 255, 255)");
		document.getElementById("darkModeSwitch").setAttribute("style", "color:rgb(255, 255, 255)");
		var i = 0;
		for (i=0; trackArray.length;i++){
			currentToken = seqArray[i]
			if (currentToken == "gender"){
				//modify gender tokens
				var currentStatus = trackArray[i];
				if (currentStatus == "p"){
					document.getElementById("maleText").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("femaleText").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("otherText").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("genderLabel").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("genderError").setAttribute("style", "display:none");
				}
				else if (currentStatus == "e"){
					document.getElementById("maleText").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("femaleText").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("otherText").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("genderLabel").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("genderError").setAttribute("style", "display:inline-block");
				}
				else if (currentStatus == "n"){
					document.getElementById("maleText").setAttribute("style", "color:rgb(255, 255, 255)");
					document.getElementById("femaleText").setAttribute("style", "color:rgb(255, 255, 255)");
					document.getElementById("otherText").setAttribute("style", "color:rgb(255, 255, 255)");
					document.getElementById("genderLabel").setAttribute("style", "color:rgb(255, 255, 255)");
					document.getElementById("genderError").setAttribute("style", "display:none");
				}
			}
			else{
				if (currentToken == "country"){
					//modify country tokens
					var currentStatus = trackArray[i];
					if (currentStatus == "p"){
						document.getElementById("countries").setAttribute("style", "color:rgb(12, 232, 77);background-color:rgb(0, 0, 0);border-color:rgb(12, 232, 77)");
					}
					else if (currentStatus == "e"){
						document.getElementById("countries").setAttribute("style", "color:rgb(255, 0, 0);background-color:rgb(0, 0, 0);border-color:rgb(255, 0, 0)");
					}
					else if (currentStatus == "n"){
						document.getElementById("countries").setAttribute("style", "color:rgb(255, 255, 255);background-color:rgb(0, 0, 0);border-color:rgb(255, 255,255)");
					}
					break;
				}
				


				var currentStatus = trackArray[i];
				if (currentStatus == "e"){
					updateError(currentToken);
				}
				else if (currentStatus == "n"){
					updateNeutral(currentToken);
				}
				else if (currentStatus == "p"){
					updatePass(currentToken);
				}
				
			}
			

		}

	}
	else{
		//lightmode
		
		theme = "light";

		document.getElementById("mainDIV").setAttribute("style", "background-color:rgb(255, 255, 255)");
		document.getElementById("mainTitle").setAttribute("style", "color:rgb(0, 0, 0)");
		document.getElementById("darkModeSwitch").setAttribute("style", "color:rgb(0, 0, 0)");
		var i = 0;
		for (i=0; trackArray.length;i++){
			currentToken = seqArray[i]
			if (currentToken == "gender"){
				//modify gender tokens
				var currentStatus = trackArray[i];
				if (currentStatus == "p"){
					document.getElementById("maleText").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("femaleText").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("otherText").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("genderLabel").setAttribute("style", "color:rgb(12, 232, 77)");
					document.getElementById("genderError").setAttribute("style", "display:none");
				}
				else if (currentStatus == "e"){
					document.getElementById("maleText").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("femaleText").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("otherText").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("genderLabel").setAttribute("style", "color:rgb(255, 0, 0)");
					document.getElementById("genderError").setAttribute("style", "display:inline-block");
				}
				else if (currentStatus == "n"){
					document.getElementById("maleText").setAttribute("style", "color:rgb(0, 0, 0)");
					document.getElementById("femaleText").setAttribute("style", "color:rgb(0, 0, 0)");
					document.getElementById("otherText").setAttribute("style", "color:rgb(0, 0, 0)");
					document.getElementById("genderLabel").setAttribute("style", "color:rgb(0, 0, 0)");
					document.getElementById("genderError").setAttribute("style", "display:none");
				}
			}
			else{
				if (currentToken == "country"){
				//modify country tokens
					var currentStatus = trackArray[i];
					if (currentStatus == "p"){
						document.getElementById("countries").setAttribute("style", "color:rgb(12, 232, 77);background-color:rgb(255, 255, 255);border-color:rgb(12, 232, 77)");
					}
					else if (currentStatus == "e"){
						document.getElementById("countries").setAttribute("style", "color:rgb(255, 0, 0);background-color:rgb(255, 255, 255);border-color:rgb(255, 0, 0)");
					}
					else if (currentStatus == "n"){
						document.getElementById("countries").setAttribute("style", "color:rgb(0, 0, 0);background-color:rgb(255, 255, 255);border-color:rgb(0, 0,0)");
					}
					break;
				}
				


				var currentStatus = trackArray[i];
				if (currentStatus == "e"){
					updateError(currentToken);
				}
				else if (currentStatus == "n"){
					updateNeutral(currentToken);
				}
				else if (currentStatus == "p"){
					updatePass(currentToken);
				}
				
			}
			

		}
		
	}
}



function pLoginFunc(){
	location.href = "signInPage.html";
}
function back(){
	location.href = "index.html";
}
function next(){
	var ready = true;
	var i = 0;
	for (i=0; i<trackArray.length;i++){
		currentToken = trackArray[i];
		if (currentToken != "p"){
			ready = false;
		}
	}
	if (ready == false){
		alert("Some of your details are currently not filled out or are invalid - please corrent them or fill them in.");
		return;
	}
	var encrKey = "-";
	var i = 0;
	var username = verifArray[4][1];
	for (i=0;i<username.length;i++){
		encrKey += (username[i].charCodeAt()).toString();
		encrKey += "-";
	}
	var chatArray = [["RecUsername", "ChatID"]];

	var serverData = {
		forename:encrypt(verifArray[0][1], encrKey),
		surname:encrypt(verifArray[1][1], encrKey),
		dob:encrypt(verifArray[2][1], encrKey),
		gender:encrypt(verifArray[3][1], encrKey),
		username:(verifArray[4][1]),
		password:encrypt(verifArray[5][1], encrKey),
		country:encrypt(verifArray[6][1], encrKey),
		theme:encrypt(theme, encrKey),
		firstTimeLogin:encrypt("false", encrKey),
	};

	try{
		firebase.database().ref("User Accounts").push(serverData);
		firebase.database().ref(("User Contact List/" + encrKey)).set({contactArray:chatArray});
	}
	catch(err){
		alert("There was an error in sending your details to the server.");
		console.log(err);
		return;
	}

	document.getElementById("column1DIV").style.display = "none";
	document.getElementById("column2DIV").style.display = "none";
	document.getElementById("mainTitle").innerHTML = "Sign Up Complete!";

	document.getElementById("submitButton").innerHTML = "Login";
	document.getElementById("submitButton").setAttribute("onclick", "pLoginFunc()");

	

}



function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}
function isFutureDate(idate){
	var today = new Date().getTime(),
	    idate = idate.split("/");

	idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
	return (today - idate) < 0 ? true : false;
}
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
