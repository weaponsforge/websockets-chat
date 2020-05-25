const { KEYS } = require('../defines')

class Utils {
  /**
   * Returns a random string
   */
  static generateUserID () {
    return Math.random().toString(36).substr(2, 8)
  }

  /**
   * Generates a unique rgb color code to tag a connected client.
   * @param {Array} userCodes Array of existing rgb color codes from connected clients.
   */
  static generateColorCode (userCodes) {
    const min = Math.ceil(0)
    const max = Math.floor(255)
    let rgb = null

    do {
      const r = Math.floor(Math.random() * (max - min + 1) + min)
      const g = Math.floor(Math.random() * (max - min + 1) + min)
      const b = Math.floor(Math.random() * (max - min + 1) + min)
      rgb = `rgba(${r}, ${g}, ${b}, 0.1)`
    } while (!rgb && userCodes.includes(rgb))

    return rgb
  }

  /**
   * Encodes the websockets response message to client(s) in a JSON String "{ actiontype: '', userid: '', message: '' }" structure.
   * @param {String} actiontype Defines the nature of the server response message
   * @param {String} userid A connected client's userid
   * @param {String} code Random code (rgba) assigned to client.
   * @param {String} message A string message that will be broadcasted to all other connected clients
   */
  static createResponse (actiontype, userid, code, message = '') {
    if (!actiontype || !userid || !code || !message) {
      return
      // throw new Error('Incomplete response data.')
    }

    return JSON.stringify({
      [KEYS.ACTION]: actiontype,
      [KEYS.USERID]: userid,
      [KEYS.CODE]: code,
      [KEYS.MESSAGE]: message
    })
  }

  /**
   * Encodes the received request data from client into a JSON object.
   * Expected data must be an Object containing key-value pairs { actiontype: '', userid: '', message: '' }
   * @param {String} data
   */
  static parseRequest (data) {
    return JSON.parse(data)
  }
}

module.exports = Utils
