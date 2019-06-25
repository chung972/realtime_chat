// var moment = require('moment');
// moment().format();

var socket = io();
// console.log(socket);

// configure socket "listeners"
socket.on('displayMsg', (data) => {
    // go to displayMsg for more info
    displayMsg(data);
});

socket.on('clear', ()=>{
    // go to io.js for more info
    clearChat();
});

// cache DOM elements
var uName = document.getElementById('username');
var msg = document.getElementById('message');
var msgBoard = document.getElementById('msgBoard');
var button = document.getElementById('button');
var clearBtn = document.getElementById('clear');


// add event listeners
button.addEventListener('click', () => {
    // var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var time = new Date();
    // something NON-TRIVIAL here is that when the 'send' button is clicked,
    // instead of just updating the LOCAL (in this case) index.ejs (could be
    // whatever file), what we want to do is EMIT a MESSAGE to io.js; that way,
    // io.js can then (assuming you have a socket.on(...) properly set up to 
    // accept the message being emitted), tell ALLLLL the instances of app.js
    // that the send button was clicked. in this case, because the message
    // emitted in this event handler ALSO sends data (username, message, timestamp),
    // that data will be sent along to io.js and then disseminated to all app.js
    // instances. that is why a message will appear (basically) instantly for
    // all app.js instances simultaneously. again, io.js must be properly 
    // configured to pass the data along. look at displayMsg() for more info
    socket.emit('sendMsg', {
        username: uName.value,
        message: msg.value,
        timestamp: `${time}`
    });
});

clearBtn.addEventListener('click', ()=>{
    socket.emit('clear');
})

// define functions
function displayMsg({ username, message, timestamp }) {
    // you will notice that displayMsg() accepts an object as a parameter
    // in this case, the object has 3 keys: username, message, and timestamp;
    // this is called DESTRUCTURING. it breaks down a SINGULAR data "packet"
    // into individual components; of course, this assumes that you already
    // know what precisely those individual components are; in this case,
    // because we know from socket.emit('sendMsg'...) that we are passing
    // along username, message, and timestamp; note that at the moment of
    // emission, they are sent up to io.js also as an object; if you go
    // to io.js, you can see that the data object is simply referred to as
    // 'data' while it is being handled
    var node = document.createElement("li");
    var msbItm = document.createTextNode(`[${timestamp}] ${username} says: ${message}`);
    node.appendChild(msbItm);
    msgBoard.appendChild(node);
}

function clearChat(){
    msgBoard.innerHTML = '';
}