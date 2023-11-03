const socket = new WebSocket('ws://localhost:4200/')

socket.addEventListener('open', () => {
	console.log('Websocket connection opened')
})

socket.addEventListener('close', () => {
	console.log('Websocket connection closed')
})

socket.addEventListener('message', (message) => {
	const msgDiv = document.createElement('div')
	msgDiv.classList.add('msgCtn')

	if (message.data instanceof Blob) {
		const reader = new FileReader()
		reader.onload = () => {
			msgDiv.innerHTML = reader.result
			document.getElementById('messages').appendChild(msgDiv)
		}
		reader.readAsText(message.data)
	} else {
		msgDiv.innerHTML = message.data
		document.getElementById('messages').appendChild(msgDiv)
	}
})

const form = document.getElementById('msgForm')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const message = document.getElementById('inputBox').value
	socket.send(message)
	document.getElementById('inputBox').value = ''
})
