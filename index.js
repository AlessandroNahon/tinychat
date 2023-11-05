import socket from './socket.js'

const form = document.getElementById('msgForm')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const message = document.getElementById('inputBox').value
	const hasWhiteSpaceOnly = /^\s+$/.test(message)
	if (message && !hasWhiteSpaceOnly) socket.send(message)
	document.getElementById('inputBox').value = ''
})
