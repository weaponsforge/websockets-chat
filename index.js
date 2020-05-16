const express = require('express')
const http = require('http')
const Websockets = require('ws')
const app = express()
const PORT = process.env.PORT || 3000

// Webserver
app.use(express.static('public'))
const server = http.createServer(app)

// Websockets server
const ws = new Websockets.Server({ server })

ws.on('connection', (wsconnection) => {
  console.log('connected!')
})

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
