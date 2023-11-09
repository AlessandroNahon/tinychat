export function displayMessage({ msg, clientId, clients }) {
	const msgEl = document.createElement('div')
	const idEl = document.createElement('span')
	const messages = document.getElementById('messages')

	msgEl.classList.add('msgCtn')
	idEl.classList.add('clientId')
	msgEl.setAttribute('data-client-id', clientId)
	idEl.setAttribute('data-client-id', clientId)

	msgEl.innerHTML = msg
	idEl.innerHTML = clientId.split('-')[0]

	messages.appendChild(msgEl)
	messages.appendChild(idEl)

	messages.scrollTo(0, messages.scrollHeight)
	styleMessages(clients)
}

export function displayUsers(clients) {
	const listEl = document.createElement('ul')
	const metadataEl = document.getElementById('metadata')
	const headerEl = document.createElement('h2')

	metadataEl.innerHTML = ''
	headerEl.innerHTML = 'Users'

	listEl.classList.add('users')
	listEl.appendChild(headerEl)

	clients.forEach((uid) => {
		const itemEl = document.createElement('li')
		itemEl.innerHTML = uid.split('-')[0]
		listEl.appendChild(itemEl)
	})

	metadataEl.appendChild(listEl)
}

function styleMessages(clients) {
	if (clients.length > 0) {
		clients.forEach((uid, i) =>
			document.querySelectorAll(`[data-client-id='${uid}']`).forEach((e) => {
				if (e.classList.contains('msgCtn')) {
					e.classList.add(`user${i}`)
				}
				if (e.classList.contains('clientId')) {
					e.classList.add(`clientId${i}`)
				}
			})
		)
	}
}
