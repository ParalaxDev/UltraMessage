function setupCanvas(){
	//------------get dimension of screen----------------
	var total_height = (window.innerHeight).toString() + "px";
	var total_width = (window.innerWidth).toString() + "px";
	document.getElementById("theme-switcher").checked = false;

	
}
function checkMode(){
	var status =  document.getElementById("theme-switcher").checked;
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
	console.log("Button Pressed")
	return;
}
function signUp(){
	location.href = "signUpPage.html";
}
function signIn(){
	location.href = "signInPage.html";
}

// New Code by Paralax#7228

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
   if (localStorage.getItem('theme') === 'theme-dark'){
       setTheme('theme-light');
   } else {
       setTheme('theme-dark');
   }
}

// Immediately invoked function to set the theme on initial load
(function () {
   if (localStorage.getItem('theme') === 'theme-dark') {
       setTheme('theme-dark');
   } else {
       setTheme('theme-light');
   }
})();

