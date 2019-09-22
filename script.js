const socket = io('http://localhost:3000');


// get from client
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


//get joined user name
const name = prompt('What is your name');
appendMessage('you joined');
socket.emit('new-user', name);



socket.on('chat-message', data => {

    appendMessage(`${data.name} : ${data.message}`);

});


socket.on('user-connected', name => {

    appendMessage(`${name} connected`);

});


socket.on('user-disconnected', name => {

    appendMessage(`${name} disconnected`);

});
// send to server

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message', message);
    messageInput.value = '';

});

// append message to container
function appendMessage(message) {

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}