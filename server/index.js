const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const WebsocketServer = require('./classes/websocket-server')
const { SERVER_PORT } = require('./defines')

// Client web server
app.use(express.static(path.join(__dirname, '..', 'public')))

// Websocket server
const server = http.createServer(app)
/* eslint-disable no-unused-vars */
const ws = new WebsocketServer(server)

server.listen(SERVER_PORT, () => {
  console.log(`listening on http://localhost:${SERVER_PORT}`)
})
