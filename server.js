const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Mongo Model

const Message = mongoose.model('Message', {
    username: String,
    content: String,
    date: String
})

// Basic routing / file serving static site

app.use(express.static('public'));

// API endpoint
app.get('/messages', (request, response) => {
    Message.find({}, (error, messages) => {
        response.send(messages)
    })
    response.sendStatus(200);
    console.log('API response')
})
app.post('/messages', (request, response) => {    
    const newMessage = new Message(request.body) ;
    newMessage.save((error) => {
        if (error) throw error;
    })
    response.sendStatus(200);
    io.emit('message', newMessage);
})

// Websocket connection indicator in console. Socket events run within connection function.
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('typing', (data) => {
        console.log(`${data.username} is typing`)
        socket.broadcast.emit('notifyTyping', data)
    })
    socket.on('disconnect', () => console.log('User disconnected'));
})

io.on('typing', (data) => {
    console.log(data)
    io.emit('notifyTyping', data)
})

// MongoDB connection setup

url = 'mongodb://127.0.0.1:27017/node-message-board'
mongoose.connect(url, { useNewUrlParser: true})
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connected at: ' + url);
})
db.on('error', (err) => {
    console.log('Connection error: ' + err);
})

// Server connection

http.listen(3000, () => {
    console.log('Connected on port 3000');
})
// app.listen(3000, () => {
//     console.log('Connected on port 3000')
// })

