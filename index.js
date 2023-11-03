const socket = new WebSocket('ws://localhost:4200/')

socket.addEventListener('open', () => {
	console.log('Websocket connection opened')
})

socket.addEventListener('close', () => {
	console.log('Websocket connection closed')
})

socket.addEventListener('message', (message) => {
	if (message.data instanceof Blob) {
		const reader = new FileReader()
		reader.onload = () => displayMessage(reader.result)
		reader.readAsText(message.data)
	} else {
		displayMessage(message.data)
	}
})

const form = document.getElementById('msgForm')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const message = document.getElementById('inputBox').value
	const hasWhiteSpaceOnly = /^\s+$/.test(message)
	if (message && !hasWhiteSpaceOnly) socket.send(message)
	document.getElementById('inputBox').value = ''
})

function displayMessage(msg) {
	const msgEl = document.createElement('div')
	const msgCtn = document.getElementById('messages')

	msgEl.classList.add('msgCtn')
	msgEl.innerHTML = msg

	msgCtn.appendChild(msgEl)
	msgCtn.scrollTo(0, msgCtn.scrollHeight)
}
