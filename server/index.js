const express = require('express')
const http = require('http')
const Websocket = require('ws')
const path = require('path')
const app = express()
const Utils = require('./utils')
const { ACTION_TYPES, KEYS, SERVER_ADMIN, SERVER_PORT } = require('./defines')
const PORT = process.env.PORT || SERVER_PORT

// Client web server
app.use(express.static(path.join(__dirname, '..', 'public')))

// Websocket server
const server = http.createServer(app)
const ws = new Websocket.Server({ server })

ws.on('connection', (wsconnection) => {
  wsconnection.send(Utils.createResponse(
    ACTION_TYPES.CONNECTED,
    SERVER_ADMIN,
    'Welcome to the Chat room.'
  ))

  // Listen for incoming client message
  wsconnection.on('message', (data) => {
    const message = Utils.parseRequest(data)

    // Confirm user's first-time username registration
    if (message[KEYS.ACTION] === ACTION_TYPES.REGISTER) {
      wsconnection.send(Utils.createResponse(
        ACTION_TYPES.REGISTER,
        message[KEYS.USERID]
      ))

      // Broadcast the new user ID to all connected clients
      ws.clients.forEach(client => {
        if (client.readyState === Websocket.OPEN) {
          client.send(Utils.createResponse(
            ACTION_TYPES.BROADCAST,
            SERVER_ADMIN, 
            `[${message[KEYS.USERID]}] has joined the chat.`))
        }
      })
    } else if (message[KEYS.ACTION] === ACTION_TYPES.BROADCAST) {
      // Broadcast a user's message to all other connected clients
      ws.clients.forEach((client) => {
        if (client.readyState === Websocket.OPEN) {
          client.send(Utils.createResponse(
            ACTION_TYPES.BROADCAST, 
            message[KEYS.USERID], 
            message[KEYS.MESSAGE]))
        }
      })
    }
  })
})

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
