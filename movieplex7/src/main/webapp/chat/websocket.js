/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var websocketUri = 'ws://' + document.location.host
        + document.location.pathname.substr(0,
                document.location.pathname.indexOf("/faces")) + '/websocket';
console.log(websocketUri);
var websocket = new WebSocket(websocketUri);
var textField = document.getElementById("textField");
var users = document.getElementById("users");
var chatlog = document.getElementById("chatlog");
var username;

websocket.onopen = function (event) {
    //Called when websocket connection is initiated
    onOpen(event);
};
websocket.onmessage = function (event) {
    //Called when websocket message is received
    onMessage(event);
};
websocket.onerror = function (event) {
    //Called when an error occurs during the communication
    onError(event);
};
websocket.onclose = function (event) {
    //Called when websocket connection is terminated 
    onClose(event);
};

var output = document.getElementById("output");

//Sends a message to the endpoint of a user joining
//The endpoint broadcasts the message to all the listening clients.
function join() {
    username = textField.value;
    websocket.send(username + " joined");
}
//Appends the logged in user name and the value of the sent message
//Broadcasts this to all the clinets in the same way as join does.
function send_message() {
    websocket.send(username + ": " + textField.value);
}

//Prints out the status on the browser.
function onOpen() {
    writeToScreen("CONNECTED");
}
function onClose() {
    writeToScreen("DISCONNECTED");
}
//Updates the list of logged in users.
function onMessage(event) {
    writeToScreen("RECEIVED: " + event.data);
    if (event.data.indexOf("joined") !== -1) {
        users.innerHTML += event.data.substring(0,
                event.data.indexOf("joined")) + "\n";
    } else {
        chatlog.innerHTML += event.data + "\n";
    }
}
function onError(event) {
    writeToScreen('<span style="color: red;">ERROR:</span>' + event.data);
}
function disconnect() {
    websocket.close();
}
function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}