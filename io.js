var io = require('socket.io')();

io.on('connection', (socket)=>{

    socket.on('sendMsg', (data)=>{
        console.log("you heard 'sendMsg'; now emitting 'displayMsg'. ");
        io.emit('displayMsg', data);
    });



});




module.exports = io;