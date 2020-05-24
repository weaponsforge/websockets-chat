// Input prompt for chat username registration
// Requires the global instance of WebsocketClient (ChatWS).

Vue.component('register', {
  data: function () {
    return {
      username: '',
      messages: []
    }
  },
  methods: {
    submit () {
      ChatWS.register(this.username)
    }
  },
  template:
    `<div class="compnentcontainer registercontainer" id="register" >
      <div class="leftpanel">
        <h1>Websockets Chat</h1>
      </div>
      <div>
        <input
          id="username"
          v-model="username"
          placeholder="Enter your username"
          autocomplete="off" />
        <button @click="submit()">Submit</button>
      </div>
    </div>`
})
