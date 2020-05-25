require('dotenv').config()

const ACTION_TYPES = {
  CONNECTED: process.env.CONNECTED,
  REGISTER: process.env.REGISTER,
  BROADCAST: process.env.BROADCAST,
  LOGOUT: process.env.LOGOUT,
  ERROR: process.env.ERROR,
  PING: process.env.PING
}

const MESSAGE_TYPE = {
  SERVER: process.env.SERVER,
  USER: process.env.USER,
  OWN: process.env.OWN
}

const KEYS = {
  ACTION: process.env.ACTION,
  USERID: process.env.USERID,
  CODE: process.env.CODE,
  MESSAGE: process.env.MESSAGE
}

const SERVER_ADMIN = process.env.SERVER_ADMIN

const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT

const PING_TIMEOUT = process.env.PING_TIMEOUT

module.exports = {
  ACTION_TYPES,
  MESSAGE_TYPE,
  KEYS,
  SERVER_PORT,
  SERVER_ADMIN,
  PING_TIMEOUT
}
