/**
 * Handles "ping-pong" on connected clients from the websockets server.
 * Pings connected clients to keep their connection active.
 * Terminates the connection inactive/unreachable clients after a set timeout.
 */
class WithPingPong {
  /**
   * Creates a new WithPingPong class.
   * @param {Number} pingTimeout clients ping interval in milliseconds.
   */
  constructor (pingTimeout = 10000) {
    // setInterval reference for pinging connected websocket clients
    this.pingInterval = null

    // setInterval timeout in milliseconds
    this.pingTimeout = pingTimeout
  }

  /**
   * Ping the connected clients every "pingTimeout" seconds.
   * Prevents idling and websocket termination on heroku after 55 secs.
   * Terminates the connection of a client if it can't respond to a "pong" event.
   * Requires a ws Websocket connection member variable from and extending class.
   */
  pingClients () {
    if (!this.ws) {
      throw new Error('Missing websocket connection.')
    }

    const that = this
    this.pingInterval = setInterval(function ping () {
      that.ws.clients.forEach(function each (client) {
        if (client.isAlive === false) {
          return client.terminate()
        }

        // Reset the client's isAlive status.
        // The "pong" method heartbeat() will set it back to true if the client is still connected.
        client.isAlive = false
        client.ping(that.noop)
      })
    }, this.pingTimeout)
  }

  /**
   * Stop pinging clients
   */
  stopPing () {
    clearInterval(this.pingInterval)
  }

  /**
   * "pong" method, resets a client's isAlive status to true as long as its connected.
   */
  heartbeat () {
    this.isAlive = true
  }

  /**
   * An empty method to initiate "ping" on client.
   */
  noop () {}
}

module.exports = WithPingPong
