var username = sessionStorage.getItem("USERNAME");
if (username == null){
	location.href = "index.html";
}

sessionStorage.setItem("CURRENT_CHAT_OPEN", "null");

var user_EK = "-";
var i = 0
for (i=0;i<username.length;i++){
	user_EK += (username[i].charCodeAt()).toString();
	user_EK += "-";
}
var theme = decrypt(sessionStorage.getItem('THEME'), user_EK);


loadChats();
switchTheme(theme);



let contactNamesArray = [];
	
function sendMessage(){
	var chatID = sessionStorage.getItem("CURRENT_CHAT_OPEN");
	if (chatID == "null"){
		alert("Please select a chat.");
		return;
	}
	var message = document.getElementById("messageInput").value;

	if (message == "" || message == null){
		alert("Please enter a message.");
		return;
	}
	document.getElementById("messageInput").value = "";
	firebase.database().ref("Chats/" + chatID).once("value", function(snapshot){
		var messageArray = [];
		snapshot.forEach(function(childSnapshot){
			messageArray.push(childSnapshot.val());
		});
		messageArray[1].push([encrypt(message, chatID), encrypt(username, chatID), encrypt((new Date()).toString(), chatID)]);
		firebase.database().ref("Chats/" + chatID).set(messageArray);

		var newBtn = document.createElement("BUTTON");
		newBtn.setAttribute("class", "outgoingMessage");
		newBtn.innerHTML = message;
		newBtn.setAttribute("id", "message" + (messageArray[1].length - 1).toString());
		newBtn.setAttribute("value", message);
		newBtn.setAttribute("onclick", "messageDetails(this.value)");

	
		document.getElementById("chatPanelDIV").appendChild(newBtn);
		var newB = document.createElement("BR");
		newB.setAttribute("class", "breakSpace");
		document.getElementById("chatPanelDIV").appendChild(newB);
		document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
		var newB = document.createElement("BR");
		newB.setAttribute("class", "breakSpace");
		document.getElementById("chatPanelDIV").appendChild(newB);
		document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
	
		var chatDIV = document.getElementById("chatPanelDIV");
		document.getElementById("messageInput").focus;
	});

}
function messageDetails(messageName){
	console.log(messageName);
}

function openChat(userRec){
   	var counter = 0;
   	var actionComplete = false;
  
   	while (actionComplete == false){
   		try{
   			document.getElementById("chatPanelDIV").removeChild(document.getElementById("message" + counter.toString()));
   		}
   		catch(err){
   			actionComplete = true;
   		}
   		
   		counter = counter + 1;
   	}

   	var brElems = document.getElementsByTagName("BR");
   	for (var i=0;i<brElems.length;i++){
   		if (brElems[i].id != "spec"){
   			brElems[i].setAttribute("class", "breakFeature");
   		}
   		
   	}
    
	var nameElem = document.getElementById("chatName");
	
	nameElem.innerHTML = userRec;

	
	if (theme == "dark"){
		nameElem.setAttribute("style", "color:rgb(255, 255, 255);");
	}


	firebase.database().ref("User Contact List/" + user_EK).once("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			contactArray = childSnapshot.val();
		});
		for (var i=1;i<contactArray.length;i++){
			if (userRec == decrypt(contactArray[i][0],user_EK)){
				chatID = decrypt(contactArray[i][1], user_EK);
			}
		}
		sessionStorage.setItem("CURRENT_CHAT_OPEN", chatID);

		
		firebase.database().ref("Chats/" + chatID).once("value", function(snapshot){
			var messageArray = [];
			snapshot.forEach(function(childSnapshot){
				messageArray.push(childSnapshot.val());
			});
			var i = 0;
			for (i=0;i<(messageArray[1]).length;i++){
				var currentMessage = decrypt(messageArray[1][i][0], chatID);
				var currentSender = decrypt(messageArray[1][i][1], chatID);
				var currentTime = "This message was sent at: " + decrypt(messageArray[1][i][2], chatID);
				if (currentSender == "admin"){
					var newBtn = document.createElement("BUTTON");
					newBtn.setAttribute("class", "adminMessage");
					newBtn.innerHTML = currentMessage;
					newBtn.setAttribute("id", "message" + i.toString());
					newBtn.setAttribute("value", currentMessage);
					newBtn.setAttribute("onclick", "messageDetails(this.value)");

					if (theme == "dark"){
						newBtn.setAttribute("style", "border-color:rgb(255, 255, 255);color:rgb(255, 255, 255);background-color:rgb(0, 0, 0)");
					}
					document.getElementById("chatPanelDIV").appendChild(newBtn);
					var newB = document.createElement("BR");
					newB.setAttribute("class", "breakSpace");
					document.getElementById("chatPanelDIV").appendChild(newB);
					document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
					var newB = document.createElement("BR");
					newB.setAttribute("class", "breakSpace");
					document.getElementById("chatPanelDIV").appendChild(newB);
					document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
				}
				else if (currentSender == username){
					//outgoing
					var newBtn = document.createElement("BUTTON");
					newBtn.setAttribute("class", "outgoingMessage");
					newBtn.innerHTML = currentMessage;

					newBtn.setAttribute("id", "message" + i.toString());
					newBtn.setAttribute("value", currentMessage);
					newBtn.setAttribute("onclick", "messageDetails(this.value)");

				
					document.getElementById("chatPanelDIV").appendChild(newBtn);
					var newB = document.createElement("BR");
					newB.setAttribute("class", "breakSpace");
					document.getElementById("chatPanelDIV").appendChild(newB);
					document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
					var newB = document.createElement("BR");
					newB.setAttribute("class", "breakSpace");
					document.getElementById("chatPanelDIV").appendChild(newB);
					document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
				}
				else if (currentSender == userRec){
					//incoming
					var newBtn = document.createElement("BUTTON");
					newBtn.setAttribute("class", "incomingMessage");
					newBtn.innerHTML = currentMessage;
					newBtn.setAttribute("id", "message" + i.toString());
					newBtn.setAttribute("value", currentMessage);
					newBtn.setAttribute("onclick", "messageDetails(this.value)");

				
					document.getElementById("chatPanelDIV").appendChild(newBtn);
					var newB = document.createElement("BR");
					newB.setAttribute("class", "breakSpace");
					document.getElementById("chatPanelDIV").appendChild(newB);
					document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
					var newB = document.createElement("BR");
					newB.setAttribute("class", "breakSpace");
					document.getElementById("chatPanelDIV").appendChild(newB);
					document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
				}

			}
			document.getElementById("messageInput").focus();
		});
	});
}

function loadChats(){
	
	var serverArray = [];
	var contactNamesArray = [];


	firebase.database().ref("User Contact List/" + user_EK).once("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			serverArray = childSnapshot.val();
		});
		var i = 1;
		if (serverArray.length > 1){
			for (i=1;i<serverArray.length;i++){
				contactNamesArray.push(decrypt(serverArray[i][0], user_EK));
				
			}
		}
		
		for (var i=0;i<contactNamesArray.length;i++){
			currentName = contactNamesArray[i];
			var newBtn = document.createElement("BUTTON");
			newBtn.setAttribute("id", "contact" + i.toString());
			newBtn.setAttribute("value", currentName);
			newBtn.setAttribute("onclick", "openChat(this.value)");
			newBtn.setAttribute("class", "contactButton");
			newBtn.innerHTML = currentName;
			document.getElementById("contactsPanelDIV").appendChild(newBtn);

			if (theme == "dark"){
				newBtn.setAttribute("style", "color:rgb(255, 255, 255);background-color:rgb(0, 0, 0)");
			}
			var newB = document.createElement("BR");
			newB.setAttribute("id", "spec");
			document.getElementById("contactsPanelDIV").appendChild(newB);
			document.getElementById("contactsPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
			
		}
		document.getElementById("messageInput").focus();
		return;
		
	});

	
	

}
function createNewChat(){
	var userRec = prompt("Username of person you would like to chat with:", "");
	var validRec = true;
	if (userRec == null || userRec == ""){
		return;
	}
	if (userRec == username){
		alert("You cannot chat with yourself.");
		return;
	}

	firebase.database().ref("User Contact List/" + user_EK).once("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			serverArray = childSnapshot.val();
		});
		var i = 1;

		if (serverArray.length > 1){
			for (i=1;i<serverArray.length;i++){
				contactNamesArray.push(decrypt(serverArray[i][0], user_EK));
				
			}
		}



		if (contactNamesArray.includes(userRec)){
			alert("You are already chatting to this user.");
			validRec = false;
		}
		
		firebase.database().ref("User Accounts").once("value", function(snapshot){
		
			var takenUsernames = [];
			snapshot.forEach(function(childSnapshot){
				takenUsernames.push(childSnapshot.val()["username"]);
			});
			if (takenUsernames.includes(userRec) == false){
				validRec = false;
				alert("This user was not found.");
			}
			if (validRec == true){
				
				var chatID = "";
				for (var i=0;i<6;i++){
					chatID += (Math.floor(100000 + Math.random() * 900000)).toString();
				}

				var serverArray = [];
				firebase.database().ref("User Contact List/" + user_EK).once("value", function(snapshot){
					snapshot.forEach(function(childSnapshot){
						serverArray = childSnapshot.val();
					});
					serverArray.push([encrypt(userRec, user_EK), encrypt(chatID, user_EK)]);
					

					firebase.database().ref("User Contact List/" + user_EK + "/contactArray").set(serverArray);

					var recKey = "-";
					for (var i=0;i<userRec.length;i++){
						recKey += (userRec[i].charCodeAt()).toString();
						recKey += "-";
					}

					var recServerArray = [];
					
					firebase.database().ref("User Contact List/" + recKey).once("value", function(snapshot){
						snapshot.forEach(function(childSnapshot){
							recServerArray = childSnapshot.val();
						});
						recServerArray.push([encrypt(username, recKey), encrypt(chatID, recKey)]);
						firebase.database().ref("User Contact List/" + recKey + "/contactArray").set(recServerArray);
						var creation_time = (new Date()).toString();
						var messageArray = [[encrypt(username, chatID), encrypt(creation_time, chatID), encrypt(chatID, chatID)], [[encrypt(("This new chat has been created by " + username), chatID), encrypt("admin", chatID), encrypt((new Date()).toString(), chatID)]]];
						firebase.database().ref("Chats/" + chatID).set(messageArray);



						currentName = userRec;
						var newBtn = document.createElement("BUTTON");
						newBtn.setAttribute("id", "contact" + i.toString());
						newBtn.setAttribute("value", currentName);
						newBtn.setAttribute("onclick", "openChat(this.value)");
						newBtn.setAttribute("class", "contactButton");
						newBtn.innerHTML = currentName;
						document.getElementById("contactsPanelDIV").appendChild(newBtn);

						if (theme == "dark"){
							newBtn.setAttribute("style", "color:rgb(255, 255, 255);background-color:rgb(0, 0, 0)");
						}
						var newB = document.createElement("BR");
						document.getElementById("contactsPanelDIV").appendChild(newB);
						document.getElementById("contactsPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;


						alert("Chat was created successfully.");
						document.getElementById("messageInput").focus();
					});
				});
				

			}

		});
		
	});
	
}
document.getElementById("messageInput").focus();


function viewAccountSettings(){
	location.href = "accountSettings.html";
	return;
}
function logout(){
	if (confirm('Press OK to confirm that you want to logout.')) {
		sessionStorage.removeItem("USERNAME");
		sessionStorage.removeItem("THEME");
		location.href = "index.html";
	} 
	else {
		return;
	}
}

function switchTheme(mode){
	if (mode == "dark"){
		document.getElementById("chatPanelDIV").setAttribute("style", "border-color:rgb(255, 255, 255");
		document.getElementById("contactsPanelDIV").setAttribute("style", "border-color:rgb(255, 255, 255");
		document.getElementsByTagName("BODY")[0].setAttribute("style", "background-color:rgb(0, 0, 0)");
		document.getElementById("messageInput").setAttribute("style", "border-color:rgb(255, 255, 255);color:rgb(255, 255, 255); background-color:rgb(0, 0, 0)");
		document.getElementById("chatsLabel").setAttribute("style", "color:rgb(255, 255, 255)");
		
	}	
	else if (mode == "light"){
		document.getElementById("chatPanelDIV").setAttribute("style", "border-color:rgb(0, 0, 0");
		document.getElementById("contactsPanelDIV").setAttribute("style", "border-color:rgb(0, 0, 0");
		document.getElementsByTagName("BODY")[0].setAttribute("style", "background-color:rgb(255, 255, 255)");
		document.getElementById("messageInput").setAttribute("style", "border-color:rgb(0, 0, 0);color:rgb(0, 0, 0); background-color:rgb(255, 255, 255)");	
		document.getElementById("chatsLabel").setAttribute("style", "color:rgb(0, 0, 0)");
	}
	return;
}

function sleep(ms){
	
    return new Promise(resolve => setTimeout(resolve, ms));
}
function arr_diff(a1, a2) {
	var diff = [];
	var res = false;
	
	if (a1.length != a2.length){
		while (res == false){
			
			if (a1[a1.length - 1][2]==a2[a2.length - 1][2]){
				res = true;
			}else{
				diff.push(a2[a2.length - 1]);
				a2.splice(-1, 1);
			}
		}
	}
	
    return diff;
}
function converter(inputArray){

	
	var outputArray = [];
	var counter0 = 0;
	var counter1 = 1;
	var counter2 = 2;

	for (var i=0;i<(inputArray.length/3);i++){
		outputArray.push([inputArray[counter0], inputArray[counter1], inputArray[counter2]]);
		counter0 += 3;
		counter1 += 3;
		counter2 += 3;
	}

	return outputArray;

}
function check4Messages(prevArray){

	var messagesToLoad = [];
	var chatID = sessionStorage.getItem("CURRENT_CHAT_OPEN");

	if (chatID != "null"){
		firebase.database().ref("Chats/" + chatID).once("value", function(snapshot){
			let currentArray = [];
			var tempArray = snapshot.val()[1];
			
			var i = 0;
			tempArray.forEach(function(){
				
				
				currentArray.push(tempArray[i][2]);
				i = i + 1;

			});
		
			var prevArray = sessionStorage.getItem("CHAT_ARRAY");
			

			var mainArray = snapshot.val()[1];
			if (prevArray != "null"){
		
				prevArray = converter(prevArray.split(","));
				



				var diff = arr_diff(prevArray, mainArray);

				
				if (diff.length != 0){
					for (var i=0;i<diff.length;i++){
						
						var currentNode = diff[i];
						
						messagesToLoad.push([decrypt(diff[i][0], chatID), decrypt(diff[i][1], chatID), decrypt(diff[i][2], chatID)]);
						
					}
				}


			}
			
			if (messagesToLoad.length > 0){
				for(var i=0;i<messagesToLoad.length;i++){
					
					var message = messagesToLoad[i][0];
					var sender = messagesToLoad[i][1];
					var time = messagesToLoad[i][2];

				
					if(sender != username){
						var newElem = document.createElement("BUTTON");
						if (sender == "admin"){
							newElem.setAttribute("class", "adminMessage");
						}else{
							newElem.setAttribute("class", "incomingMessage");
						}
						newElem.setAttribute("id", "message" + i.toString());
						newElem.innerHTML = message;
						newElem.setAttribute("value", message);
						newElem.setAttribute("onclick", "openChat(this.value)");

					
						document.getElementById("chatPanelDIV").appendChild(newElem);


						var newB = document.createElement("BR");
						newB.setAttribute("class", "breakSpace");
						document.getElementById("chatPanelDIV").appendChild(newB);
						document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
						var newB = document.createElement("BR");
						newB.setAttribute("class", "breakSpace");
						document.getElementById("chatPanelDIV").appendChild(newB);
						document.getElementById("chatPanelDIV").scrollTop = document.getElementById("contactsPanelDIV").scrollHeight;
				


					}
				}
			}
			sessionStorage.removeItem("CHAT_ARRAY");
			
			sessionStorage.setItem("CHAT_ARRAY", snapshot.val()[1]);
			

			mainArray = [];
			prevArray = [];
			currentArray = [];
			tempArray = [];
		});
	}
	
}
async function mainLoop(){
	var eventRun = true;
	var newArray = [];
	document.getElementById("messageInput").addEventListener("keydown", function (e) {
	    if (e.keyCode === 13) {
	        sendMessage();
	    }
	});
	while (eventRun == true){
		check4Messages();
		await sleep(2000);
	}	
}



sessionStorage.setItem("CHAT_ARRAY", "null");
sessionStorage.setItem("PREVIOUS_TIME_TOKEN", "null");
mainLoop();

