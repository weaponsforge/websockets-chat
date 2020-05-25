const Websocket = require('ws')
const Utils = require('./utils')
const WithPingPong = require('./with-pingpong')

const {
  ACTION_TYPES,
  KEYS,
  SERVER_ADMIN,
  PING_TIMEOUT
} = require('../defines')

/**
 * Class that creates a new Websocket server.
 * Listens for incoming client "message".
 * Broadcasts client "message" to all other connected clients.
 * Monitors clients with "ping-pong" messages using WithPingPong.
 */
class WebsocketServer extends WithPingPong {
  /**
   * Initializes a Websocket server using a nodejs/express web server.
   * @param {Server} server http or https nodejs/express server.
   * @param {Number} pingTimeout clients ping interval in milliseconds.
   */
  constructor (server, pingTimeout = parseInt(PING_TIMEOUT)) {
    super(pingTimeout)

    // Websocket server
    this.ws = new Websocket.Server({ server })

    // Server rgb color code
    this.serverCode = 'none'

    // Current websocket client connection
    this.wsConnection = null
    this.initialize()
  }

  /**
   * Initialize listeners and corresponding actions for incoming client "message".
   */
  initialize () {
    this.ws.on('connection', (wsConnection, req) => {
      this.wsConnection = wsConnection

      // Add a method to respond to "ping". Reset the isAlive client status to true
      wsConnection.isAlive = true
      wsConnection.on('pong', this.heartbeat)

      // Send a first-time welcome message
      this.sendMessage(ACTION_TYPES.CONNECTED, 'Welcome to the Chat room.')

      // Assign a unique rgb color code to the newly-connected client
      const userCodes = (Array.from(this.ws.clients).map(x => x.code)).filter(x => x !== undefined)
      wsConnection.code = Utils.generateColorCode(userCodes)

      // Listen for incoming client message
      this.wsConnection.on('message', (data) => {
        const message = Utils.parseRequest(data)

        // Confirm user's first-time username registration
        switch (message[KEYS.ACTION]) {
        case ACTION_TYPES.REGISTER:
          // Acknowlege the username update
          this.sendMessage(ACTION_TYPES.REGISTER, {
            [KEYS.CODE]: wsConnection.code,
            [KEYS.USERID]: message[KEYS.USERID]
          })

          // Broadcast the new user ID to all connected clients
          this.broadcastMessage(SERVER_ADMIN, this.serverCode, `[${message[KEYS.USERID]}] has joined the chat.`)
          break

        case ACTION_TYPES.BROADCAST:
          // Broadcast a user's message to all other connected clients
          this.broadcastMessage(message[KEYS.USERID], wsConnection.code, message[KEYS.MESSAGE])
          break

        case ACTION_TYPES.PING:
          this.sendMessage(ACTION_TYPES.PING, true)
          break

        default:
          // Send an error warning to user
          this.sendMessage(ACTION_TYPES.ERROR, 'Invalid message action.')
          break
        }
      })
    })

    this.pingClients()

    this.ws.on('close', function close () {
      console.log('Client disconnected.')
      this.stopPing()
    })
  }

  /**
   * Broadcast a message to all connected clients
   * @param {String} userid Client userid where the message will originate from.
   * @param {String} message Message to broadcast to all connected clients.
   * @param {String} code Random code (rgba) assigned to client.
   */
  broadcastMessage (userid, code, message) {
    this.ws.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(Utils.createResponse(
          ACTION_TYPES.BROADCAST,
          userid,
          code,
          message))
      }
    })
  }

  /**
   * Send a server message targeted to the current-connected client only.
   * @param {String} actionType Defines the nature of the server response message.
   * @param {String} message A string message that will be broadcasted to all other connected clients.d
   */
  sendMessage (actionType, message) {
    this.wsConnection.send(Utils.createResponse(
      actionType,
      SERVER_ADMIN,
      this.serverCode,
      message
    ))
  }
}

module.exports = WebsocketServer
