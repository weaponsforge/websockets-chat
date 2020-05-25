/**
 * Establishes connection to the websocket server.
 * Listens and sends for messages to and from the websocket server.
 * Uses the browser's native WebSocket.
 * Requires defines.js
 */
class WebsocketClient {
  constructor () {
    this.socket = new WebSocket(`${window.location.origin.replace(/^http/, 'ws')}`)
    this.user = null
    this.isConnected = false

    // DELETE
    this.connectionTime = 0
    this.interval = null

    // Client to server ping
    this.pingInterval = null
    this.pingTimeout = PING_TIMEOUT
  }

  /**
   * Listen for websocket server events on client.
   * @param {Function} callback Callback method from a calling vue component.
   */
  initSocket (callback) {
    this.socket.addEventListener('open', () => {
      console.log('connected to server.')
      this.pingStart()
      this.isConnected = true
    })

    this.socket.addEventListener('message', (event) => {
      const data = this.parseResponse(event.data)

      switch (data[ACTION]) {
      case REGISTER:
        this.user = data[MESSAGE][USERID]
        break
      default:
        // Reset ping
        this.pingStart()
        break
      }

      callback(data)
    })

    this.socket.addEventListener('close', (event) => {
      clearInterval(this.interval)
      clearInterval(this.pingInterval)
      console.log('connection closed.')
      console.log(`connection time: ${this.connectionTime}`)
    })

    this.socket.addEventListener('disconnect', (event) => {
      clearInterval(this.pingInterval)
      console.log('connection disconnected.')
      console.log(event)
    })

    this.socket.onerror = function (event) {
      clearInterval(this.pingInterval)
      console.log(event)
      alert(event.data)
    }

    // DELETE
    this.interval = setInterval(() => {
      this.connectionTime += 1
    }, 1000)
  }

  pingStart () {
    clearInterval(this.pingInterval)

    // Ping server
    this.pingInterval = setInterval(() => {
      this.socket.send(this.createRequest({
        [ACTION]: PING
      }))
    }, this.pingTimeout)
  }

  pingStop () {
    clearInterval(this.pingInterval)
  }

  /**
   * Send the text content of an html <input /> to the ws server.
   * @param {String} message String text to broadcast
   */
  sendMessage (message) {
    if (this.socket.readyState !== this.socket.OPEN) {
      alert('Please reload your re-establish connection.')
      return
    }

    try {
      this.socket.send(this.createRequest({
        [ACTION]: BROADCAST,
        [USERID]: this.user,
        [MESSAGE]: message
      }))
    } catch (err) {
      alert(`${err.message}\nReload your browser to re-establish connection.`)
    }
  }

  /**
   * Send the client's username to use for chat broadcast.
   * @param {String} username
   */
  register (username) {
    if (!username) {
      throw new Error('Username required.')
    }

    try {
      this.socket.send(this.createRequest({
        [ACTION]: REGISTER,
        [USERID]: username
      }))
    } catch (err) {
      alert(`${err.message}\nReload your re-establish connection.`)
    }
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
