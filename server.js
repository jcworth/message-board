const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Mongo Model

const Message = mongoose.model('Message', {
    name: String,
    content: String
})

// Basic routing

app.use(express.static('public'));

app.get('/messages', (request, response) => {
    response.sendStatus(200);
    console.log('Page response')
})

app.post('/messages', (request, response) => {
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
