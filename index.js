const socket = new WebSocket('ws://localhost:4200/')

socket.addEventListener('open', (cn) => {
	console.log('Websocket connection opened', cn)
})

socket.addEventListener('close', () => {
	console.log('Websocket connection closed')
})

socket.addEventListener('message', (message) => {
	const reader = decodeMessage(message)
	reader.onload = () => {
		const clientId = JSON.parse(message.data).id
		displayMessage({ msg: reader.result, clientId })
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

function displayMessage({ msg, clientId }) {
	const idEl = document.createElement('span')
	const msgEl = document.createElement('div')
	const msgCtn = document.getElementById('messages')

	idEl.classList.add('clientId')
	msgEl.classList.add('msgCtn')
	msgEl.setAttribute('data-client-id', clientId)

	msgEl.innerHTML = msg
	idEl.innerHTML = clientId

	msgCtn.appendChild(idEl)
	msgCtn.appendChild(msgEl)
	msgCtn.scrollTo(0, msgCtn.scrollHeight)
}

function decodeMessage(message) {
	const buffer = JSON.parse(message.data).text.data
	const blob = new Blob([new Uint8Array(buffer)], { type: 'text/plain' })
	const reader = new FileReader()

	reader.readAsText(blob)

	return reader
}
