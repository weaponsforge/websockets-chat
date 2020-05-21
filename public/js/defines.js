// Global constant definitions for web client in sync with server/defines.js

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

const SERVER_PORT = 3000

const SERVER_ADMIN = 'system'