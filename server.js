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

wss.on('connection', (client) => {
	client.on('error', console.error)
	client.on('message', (msg) => {
		broadcast(msg)
	})
})

function broadcast(msg) {
	for (const client of wss.clients) {
		if (client.readyState === ws.OPEN) {
			client.send(msg)
		}
	}
}

server.listen('4200', () => {
	console.log(`server listening on port 4200`)
})
