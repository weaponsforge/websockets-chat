const ACTION_TYPES = {
  CONNECTED: 'connected',
  REGISTER: 'register',
  BROADCAST: 'broadcast',
  LOGOUT: 'logout'
}

const MESSAGE_TYPE = {
  SERVER: 'server_msg',
  USER: 'user_msg',
  OWN: 'own_msg'
}

const KEYS = {
  ACTION: 'actiontype',
  USERID: 'userid',
  MESSAGE: 'message'
}

const SERVER_ADMIN = 'system'

const SERVER_PORT = 3000

module.exports = {
  ACTION_TYPES,
  MESSAGE_TYPE,
  KEYS,
  SERVER_PORT,
  SERVER_ADMIN
}