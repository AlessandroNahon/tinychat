import { createServer } from 'http'
import ws, { WebSocketServer } from 'ws'

const server = createServer((req, res) => {
	fs.readFile(__dirname + '/index.html', (err, data) => {
		if (err) {
			res.writeHead(404)
			res.end(JSON.stringify(err))
			return
		}

		res.writeHead(200)
		res.end(data)
	})
})

const wss = new WebSocketServer({ server })
const clients = new Set()

wss.getUniqueID = uuidv4

wss.on('connection', (ws) => {
	ws.id = wss.getUniqueID()
	clients.add(ws.id)

	ws.on('message', (msg) => {
		const message = {
			type: 'message',
			text: msg,
			id: ws.id,
			date: Date.now(),
			clients: [...clients],
		}
		broadcast(JSON.stringify(message))
	})

	ws.on('error', console.error)

	ws.on('close', () => {
		clients.delete(ws.id)
	})

	broadcast(
		JSON.stringify({
			type: 'open',
			text: '',
			id: ws.id,
			date: Date.now(),
			clients: [...clients],
		})
	)
})

server.listen('4200', () => {
	console.log(`server listening on port 4200`)
})

function broadcast(data) {
	for (const client of wss.clients) {
		if (client.readyState === ws.OPEN) {
			client.send(data)
		}
	}
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var uuid = (Math.random() * 16) | 0,
			v = c == 'x' ? uuid : (uuid & 0x3) | 0x8
		return uuid.toString(16)
	})
}
