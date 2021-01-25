function setupCanvas(){
	//------------get dimension of screen----------------
	var total_height = (window.innerHeight).toString() + "px";
	var total_width = (window.innerWidth).toString() + "px";
	document.getElementById("themeCheckbox").checked = false;

	
}
function checkMode(){
	var status =  document.getElementById("themeCheckbox").checked;
	if (status == true){
		//switch to dark mode
		document.getElementById("mainBody").setAttribute("style", "background-color:rgb(0, 0, 0)");
		document.getElementById("centreItemsDIV").setAttribute("style", "background-color:rgb(0, 0, 0)");
		document.getElementById("darkModeSwitch").setAttribute("style", "color:rgb(255, 255, 255)");
		document.getElementById("mainTitle").setAttribute("style", "color:rgb(255, 255, 255)");
	}
	else{
		//switch to light mode
		document.getElementById("mainBody").setAttribute("style", "background-color:rgb(255, 255, 255)");
		document.getElementById("centreItemsDIV").setAttribute("style", "background-color:rgb(255, 255, 255)");
		document.getElementById("mainTitle").setAttribute("style", "color:rgb(0, 0, 0)");
		document.getElementById("darkModeSwitch").setAttribute("style", "color:rgb(0, 0, 0)");
	}
	return;
}
function signUp(){
	location.href = "signUpPage.html";
}
function signIn(){
	location.href = "signInPage.html";
}