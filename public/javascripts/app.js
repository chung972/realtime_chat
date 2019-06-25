// var moment = require('moment');
// moment().format();

var socket = io();
console.log(socket);

socket.on('displayMsg', (data) => {
    displayMsg(data);
})

var uName = document.getElementById('username');
var msg = document.getElementById('message');
var button = document.getElementById('button');
var msgBoard = document.getElementById('msgBoard');

button.addEventListener('click', () => {
    // var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var time = new Date();
    socket.emit('sendMsg', {
        username: uName.value,
        message: msg.value,
        timestamp: `${time}`
    });
});

function displayMsg({ username, message, timestamp }) {
    var node = document.createElement("li");
    var msbItm = document.createTextNode(`[${timestamp}] ${username} says: ${message}`);
    node.appendChild(msbItm);
    msgBoard.appendChild(node);
}