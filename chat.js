export function displayMessage({ msg, clientId, clients }) {
	const msgEl = document.createElement('div')
	const messages = document.getElementById('messages')

	msgEl.classList.add('msgCtn')
	msgEl.setAttribute('data-client-id', clientId)

	msgEl.innerHTML = msg

	messages.appendChild(msgEl)
	messages.scrollTo(0, messages.scrollHeight)
	styleMessages(clients)
}

function styleMessages(clients) {
	if (clients.length > 0) {
		clients.forEach((uid, i) =>
			document
				.querySelectorAll(`[data-client-id='${uid}']`)
				.forEach((e) => e.classList.add(`user${i}`))
		)
	}
}
