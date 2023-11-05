import { displayMessage, decodeMessage } from './chat.js'

const socket = new WebSocket('ws://localhost:4200/')

socket.addEventListener('open', () => {
	console.log('Websocket connection opened')
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

export default socket
