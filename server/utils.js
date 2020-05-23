const { KEYS } = require('./defines')

class Utils {
  /**
   * Returns a random string
   */
  generateUserID () {
    return Math.random().toString(36).substr(2, 8)
  }

  /**
   * Encodes the websockets response message to client(s) in a JSON String "{ actiontype: '', userid: '', message: '' }" structure.
   * @param {String} actiontype Defines the nature of the server response message
   * @param {String} userid A connected client's userid
   * @param {String} message A string message that will be broadcasted to all other connected clients
   */
  createResponse (actiontype, userid, message) {
    if (!actiontype || !userid || !message) {
      throw new Error('Incomplete response data.')
    }

    return JSON.stringify({
      [KEYS.ACTION]: actiontype,
      [KEYS.USERID]: userid,
      [KEYS.MESSAGE]: message
    })
  }

  /**
   * Encodes the received request data from client into a JSON object.
   * Expected data must be an Object containing key-value pairs { actiontype: '', userid: '', message: '' }
   * @param {String} data
   */
  parseRequest (data) {
    return JSON.parse(data)
  }
}

module.exports = new Utils()
