// first things first is, REMEMBER TO MODULE.EXPORTS IO (at the bottom)
// also, you need to add these two lines (just put them under var server = http.createServer(app) ):
//      var io = require('../io');
//      io.attach(server);
// (this is in the www file under bin)
// also, you will need to add these script tags to whatever ejs/view file you'll need them in:
//      <script src="/socket.io/socket.io.js"></script>
//      <script src="/javascripts/app.js"></script>

var io = require('socket.io')();

io.on('connection', (socket)=>{

    socket.on('sendMsg', (data)=>{
        io.emit('displayMsg', data);
    });

    socket.on('clear', ()=>{
        io.emit('clear');
    })
    
    /*
    so, how we want to be thinking about things is this: io.js is a file
    that behaves a lot like a routes file would, except in this case, it 
    is concerned SOLELY for SOCKET requests. like routes, if we do NOT have
    a proper "route" set up (that is, if we don't have a socket.on prepared
    to receive a SPECIFIC MESSAGE, that message will go unheard; this means
    that having no typos is a big deal).  io.js can be listening for as many
    messages are it wants (and if you think about games, esp multiplayer ones,
    there's gonna be a lot of messages that are listened for);

    an overview of the process is this: io.js has its ear to the ground, LISTENING
    for MESSAGE(s) from app.js (this could be from one or many instances of app.js;
    or whoever is connected on the same port). once a message is heard, io.js then
    looks to see if there is a response for the message that it just heard. if there 
    IS a response, then (typically), io.js will EMIT a message to all connected app.js
    instances. those app.js's will then respond to the message emitted by io.js
    accordingly

    ALSO, you don't ALWAYS have to be sending data. for example, look at 
    socket.on('clear'...)  you can see that unlike socket.on('sendMsg'...),
    the former is NOT sending any data. this is typical for whenever you want
    to DELETE something; also something to note, you can see that for 'clear',
    we are both LISTENING and EMITTING a 'clear' message. so, we are waiting
    to hear from app.js for 'clear', and once heard, we go right back and EMITS
    to ALL the app.js's (that is, everyone who is connected to the same port) 
    a message of 'clear'. the message that is listened for and emitted do not
    have to be the same (just look at socket.on('sendMsg'...). )
     */

});




module.exports = io;