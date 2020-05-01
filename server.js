const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.listen(3000, () => {
    console.log('Connected on port 3000')
})

app.use('/', express.static('public'))

url = 'mongodb://127.0.0.1:27017/node-message-board'
mongoose.connect(url, { useNewUrlParser: true})
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connected at: ' + url);
})
db.on('error', (err) => {
    console.log('Connection error: ' + err);
})

app.get('/messages', (request, response) => {
    response.sendStatus(200);
    console.log('Message response')
})

app.post('/messages', (request, response) => {
    console.log('Message POST');
})


const Message = mongoose.model('Message', {
    name: String,
    content: String
})

