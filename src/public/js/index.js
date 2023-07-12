const socket = io()
const chatbox = document.getElementById('chatbox')
let user = sessionStorage.getItem('user') || ''

if (!user) {
    Swal.fire({
        title: 'Auth',
        input: 'text',
        text: 'Set username',
        inputValidator: value => {
            return !value.trim() && 'Please. Write a username'
        },
        allowOutsideClick: false
    }).then(result => {
        user = result.value
        document.getElementById('username').innerHTML = user
        sessionStorage.setItem("user", user)
        socket.emit('new', user)
    })
} else {
    document.getElementById('username').innerHTML = user
    socket.emit('new', user)
}


// Enviar mensajes
chatbox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const message = chatbox.value.trim()
        if (message.length > 0) {
            socket.emit('message', {
                user,
                message
            })

            chatbox.value = ''
        }
    }
})

// Recibir Mensajes
socket.on('logs', data => {
    const divLogs = document.getElementById('logs')
    console.log(data)
    let messages = ''
    messages = '.center' +
	'.contacts' +
		'i.fas.fa-bars.fa-2x' +
		'h2 Contacts'+
		
		'.contact'+
			'.pic.danvers'
            
    data.forEach(msn => {
       // messages = `<p><i>${msn.user}</i>: ${msn.message}</p>` + messages

        messages = messages + `.name ${msn.user}`
        messages = messages + `.message` 
        messages = messages + `.chat`
		messages = messages + `.contact.bar`
        messages = messages + `.pic.stark`
		
		messages = messages + `#chat.messages`
			
        messages = messages + `.message.parker ${msn.message}`
    })
    messages = messages + '.message.stark'
    messages = messages + '.typing.typing-1'
    messages = messages + '.typing.typing-2'
    messages = messages + '.typing.typing-3'
    messages = messages + '.input'
    messages = messages + 'i.fas.fa-camera'
    messages = messages + 'i.far.fa-laugh-beam'
    messages = messages + 'input type="text" placeholder="Type your message here!"'
    messages = messages + 'i.fas.fa-microphone'


    console.log (messages)
    divLogs.innerHTML = messages
})