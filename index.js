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
	const messages = document.getElementById('messages')

	idEl.classList.add('clientId')
	msgEl.classList.add('msgCtn')
	msgEl.setAttribute('data-client-id', clientId)

	msgEl.innerHTML = msg
	idEl.innerHTML = clientId

	messages.appendChild(idEl)
	messages.appendChild(msgEl)
	messages.scrollTo(0, messages.scrollHeight)
	styleMessages()
}

function styleMessages() {
	const userIds = getAllActiveUserIds()

	if (userIds.length > 0) {
		userIds.forEach((uid, i) =>
			document.querySelectorAll(`[data-client-id='${uid}']`).forEach((e) => {
				if (i === 0) e.style.backgroundColor = 'cornflowerblue'
				if (i === 1) e.style.backgroundColor = 'coral'
			})
		)
	}
}

function decodeMessage(message) {
	const buffer = JSON.parse(message.data).text.data
	const blob = new Blob([new Uint8Array(buffer)], { type: 'text/plain' })
	const reader = new FileReader()

	reader.readAsText(blob)

	return reader
}

function getAllActiveUserIds() {
	const messages = document.querySelectorAll('.msgCtn')
	const userIds = []
	messages.forEach((m) => userIds.push(m.getAttribute('data-client-id')))
	return [...new Set(userIds)]
}
