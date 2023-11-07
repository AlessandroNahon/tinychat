import { displayMessage } from './chat.js'

const socket = new WebSocket('ws://localhost:4200/')

socket.addEventListener('open', () => {
	console.log('Websocket connection opened')
})

socket.addEventListener('close', () => {
	console.log('Websocket connection closed')
})

socket.addEventListener('message', (message) => {
	const data = JSON.parse(message.data)
	const reader = decodeMessage(data)
	reader.onload = () => {
		if (data.type === 'message')
			displayMessage({
				msg: reader.result,
				clientId: data.id,
				clients: data.clients,
			})
	}
})

function decodeMessage(data) {
	const buffer = data.text?.data
	const blob = new Blob([new Uint8Array(buffer)], { type: 'text/plain' })
	const reader = new FileReader()

	reader.readAsText(blob)

	return reader
}

export default socket
