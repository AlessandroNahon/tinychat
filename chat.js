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
				if (i === 0) e.classList.add('user1')
				if (i === 1) e.classList.add('user2')
			})
		)
	}
}

function getAllActiveUserIds() {
	const messages = document.querySelectorAll('.msgCtn')
	const userIds = []
	messages.forEach((m) => userIds.push(m.getAttribute('data-client-id')))
	return [...new Set(userIds)]
}
