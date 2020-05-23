// Chat messages main app container.
// Contains current user and all other user's chat messages data.
// Requires: vue.js, websocket-client.js, defines.js
// Requires: associated vuejs components

const ChatWS = new WebsocketClient()

new Vue({
  el: '#app',
  data: {
    currentUser: null,
    usermessage: 'usermessage',
    mymessage: 'mymessage',
    messages: [],
  },
  mounted() {
    // Hook websocket events update to local state data
    ChatWS.initSocket(this.fetchWebsocketData)
  },
  methods: {
    fetchWebsocketData(data) {
      if (data[ACTION] === REGISTER) {
        if (!this.currentUser) {
          this.currentUser = data[MESSAGE]
        }
      } else {
        this.messages.push(data)
      }
    }
  }
})