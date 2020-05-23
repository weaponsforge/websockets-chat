const Websocket = require('ws')
const Utils = require('./utils')

const {
  ACTION_TYPES,
  KEYS,
  SERVER_ADMIN
} = require('./defines')

/**
 * Class that creates a new Websocket server.
 * Listens for incoming client "message".
 * Broadcasts client "message" to all other connected clients.
 */
class WebsocketServer {
  /**
   * Initializes a Websocket server using a nodejs/express web server.
   * @param {Server} server http or https nodejs/express server.
   */
  constructor (server) {
    // Websocket server
    this.ws = new Websocket.Server({ server })

    // Websocket connection
    this.wsconnection = null
    this.initialize()
  }

  /**
   * Initialize listeners and corresponding actions for incoming client "message".
   */
  initialize () {
    this.ws.on('connection', (wsconnection) => {
      this.wsconnection = wsconnection

      // Send a first-time welcome message
      this.sendMessage(ACTION_TYPES.CONNECTED, 'Welcome to the Chat room.')

      // Listen for incoming client message
      this.wsconnection.on('message', (data) => {
        const message = Utils.parseRequest(data)

        // Confirm user's first-time username registration
        switch (message[KEYS.ACTION]) {
        case ACTION_TYPES.REGISTER:
          // Acknowlege the username update
          this.sendMessage(ACTION_TYPES.REGISTER, message[KEYS.USERID])

          // Broadcast the new user ID to all connected clients
          this.broadcastMessage(SERVER_ADMIN, `[${message[KEYS.USERID]}] has joined the chat.`)
          break

        case ACTION_TYPES.BROADCAST:
          // Broadcast a user's message to all other connected clients
          this.broadcastMessage(message[KEYS.USERID], message[KEYS.MESSAGE])
          break

        default:
          // Send an error warning to user
          this.sendMessage(ACTION_TYPES.ERROR, 'Invalid message action.')
          break
        }
      })
    })
  }

  /**
   * Broadcast a message to all connected clients
   * @param {String} userid Client userid where the message will originate from.
   * @param {String} message Message to broadcast to all connected clients.
   */
  broadcastMessage (userid, message) {
    this.ws.clients.forEach((client) => {
      if (client.readyState === Websocket.OPEN) {
        client.send(Utils.createResponse(
          ACTION_TYPES.BROADCAST,
          userid,
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
    this.wsconnection.send(Utils.createResponse(
      actionType,
      SERVER_ADMIN,
      message
    ))
  }
}

module.exports = WebsocketServer