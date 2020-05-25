// Chat messages main app container.
// Contains current user and all other user's chat messages data.
// Requires: vue.js, websocket-client.js, defines.js
// Requires: associated vuejs components

const ChatWS = new WebsocketClient()

const app = new Vue({
  el: '#app',
  data: {
    currentUser: null,
    code: null,
    usermessage: 'usermessage',
    mymessage: 'mymessage',
    messages: []
  },
  mounted () {
    // Hook websocket events update to local state data
    ChatWS.initSocket(this.fetchWebsocketData)
  },
  methods: {
    fetchWebsocketData (data) {
      if (data[ACTION] === REGISTER) {
        console.log('--app')
        console.log(data)
        if (!this.currentUser) {
          this.currentUser = data[MESSAGE][USERID]
          this.code = data[MESSAGE][CODE]
        }
      } else if (data[ACTION] !== PING) {
        this.messages.push(data)
      }
    }
  }
})
