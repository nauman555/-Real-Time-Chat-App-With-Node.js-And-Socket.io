const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
    //getting message from server


    //on join new user
    socket.on('new-user', name => {


        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });


    // on disconnect user

    socket.on('disconnect', () => {

        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];

    });




    socket.on('send-chat-message', message => {

        // send message to other client
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        });
    });
});