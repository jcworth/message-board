const form = document.querySelector('form');
const list = document.querySelector('#message-list')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    const content = formData.get('content')
    createMessage({
        content,
        date: new Date()
    })
})

function createMessage(message) {
    fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    // console.log(message);
};

function retrieveMessage() {
    fetch('http://localhost:3000/messages')
        .then(response => response.json())
        .then(messages => {
            console.log(messages);
            insertMessage(messages)
        })
};

function insertMessage(messages) {
    messages.forEach((message) => {
        let newMessage = document.createElement('li');
        newMessage.innerText = message.content
        list.appendChild(newMessage); 
    })
}

retrieveMessage()