export function displayMessage({ msg, clientId }) {
	const msgEl = document.createElement('div')
	const messages = document.getElementById('messages')

	msgEl.classList.add('msgCtn')
	msgEl.setAttribute('data-client-id', clientId)

	msgEl.innerHTML = msg

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

export function decodeMessage(message) {
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
