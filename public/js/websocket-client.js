/**
 * Establishes connection to the websocket server.
 * Listens and sends for messages to and from the websocket server.
 * Requires defines.js
 */
class WebsocketClient {
  constructor() {
    this.socket = new WebSocket(`ws://localhost:${SERVER_PORT}`)
    this.user
    this.isConnected = false
  }


  /**
   * Listen for websocket events on client. 
   * @param {Function} callback  Callback method from a calling vue component.
   */
  initSocket (callback) {
    this.socket.addEventListener('open', () => {
      console.log('connected to server.')
      this.isConnected = true
    })

    this.socket.addEventListener('message', (event) => {
      const data = this.parseResponse(event.data)

      if (data[KEYS.ACTION] === ACTION_TYPES.REGISTER) {
        if (!this.user && data[KEYS.USERID] !== SERVER_ADMIN) {
          this.user = data[KEYS.USERID]
        }
      }      

      callback(data)
    })

    this.socket.addEventListener('close', (event) => {
      console.log('connection closed.')
    })
  }


  /**
   * Send the text content of an html <input /> to the ws server.
   * @param {String} message String text to broadcast
   */
  sendMessage (message) {
    this.socket.send(this.createRequest({
      [KEYS.ACTION]: ACTION_TYPES.BROADCAST,
      [KEYS.USERID]: this.user,
      [KEYS.MESSAGE]: message
    }))
  }


  /**
   * Send the client's username to use for chat broadcast.
   * @param {String} username 
   */
  register (username) {
    if (!username) {
      return
    }

    this.socket.send(this.createRequest({
      [KEYS.ACTION]: ACTION_TYPES.REGISTER,
      [KEYS.USERID]: username
    }))
  }


  /**
   * JSON.stringify data that will be sent to the ws server.
   * @param {Object} object A key-value pair JS object
   */
  createRequest (object) {
    return JSON.stringify(object)
  }


  /**
   * Format incoming JSON strings from the ws server as objects.
   * @param {String} data JSON string
   */
  parseResponse (data) {
    return JSON.parse(data)
  }

  getUser () {
    return this.user
  }
}