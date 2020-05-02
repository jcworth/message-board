const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Mongo Model

const Message = mongoose.model('Message', {
    name: String,
    content: String
})

// Basic routing / file serving static site

app.use(express.static('public'));

// API endpoint
app.get('/messages', (request, response) => {
    Message.find({}, (error, messages) => {
        response.send(messages)
    })
    // response.sendStatus(200);
    console.log('API response')
})
app.post('/messages', (request, response) => {
    const newMessage = new Message(request.body) ;
    newMessage.save((error) => {
        if (error) throw error;
    })
    response.sendStatus(200);
    console.log('Message POST');
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

app.listen(3000, () => {
    console.log('Connected on port 3000')
})
