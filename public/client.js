const form = document.querySelector('form');

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
    console.log(message);
}