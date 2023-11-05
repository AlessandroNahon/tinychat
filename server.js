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

wss.getUniqueID = () => {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	return s4() + s4() + '-' + s4()
}

wss.on('connection', (client) => {
	client.id = wss.getUniqueID()

	client.on('message', (msg) => {
		const message = {
			type: 'message',
			text: msg,
			id: client.id,
			date: Date.now(),
		}
		broadcast(JSON.stringify(message))
	})

	client.on('error', console.error)

	client.on('close', process.exit())
})

function broadcast(data) {
	for (const client of wss.clients) {
		if (client.readyState === ws.OPEN) {
			client.send(data)
		}
	}
}

server.listen('4200', () => {
	console.log(`server listening on port 4200`)
})
