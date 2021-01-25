var username = sessionStorage.getItem("USERNAME");
var user_EK = "-";
var i = 0;
for (i=0;i<username.length;i++){
	user_EK += (username[i].charCodeAt()).toString();
	user_EK += "-";
}
var theme = decrypt(sessionStorage.getItem('THEME'), user_EK);

function initialiseAccountDetails(){
	firebase.database().ref("User Accounts").once("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			if (username == childSnapshot.val()["username"]){
				var overallStr = "These are your account details:\n\n";
				
				var forename = decrypt(childSnapshot.val()["forename"], user_EK);
				var surname = decrypt(childSnapshot.val()["surname"], user_EK);
				var dob = decrypt(childSnapshot.val()["dob"], user_EK);
				var gender = decrypt(childSnapshot.val()["gender"], user_EK);
			
				var password = decrypt(childSnapshot.val()["password"], user_EK);
				var country = decrypt(childSnapshot.val()["country"], user_EK);
				

				
			}
			
		});
	});
}