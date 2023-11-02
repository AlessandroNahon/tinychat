const http = require('http')
const ws = require('ws')
const WebSocketServer = ws.WebSocketServer

const server = http.createServer((req, res) => {
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

const wss = new WebSocketServer({ server }) // (2)
wss.on('connection', (client) => {
	console.log('Client connected !')
	client.on('message', (msg) => {
		broadcast(msg)
	})
})
function broadcast(msg) {
	// (4)
	for (const client of wss.clients) {
		if (client.readyState === ws.OPEN) {
			client.send(msg)
		}
	}
}
server.listen(process.argv[2] || 8080, () => {
	console.log(`server listening...`)
})
