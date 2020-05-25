// Input prompt for chat username registration
// Requires the global instance of WebsocketClient (ChatWS).

Vue.component('register', {
  data: function () {
    return {
      username: '',
      messages: []
    }
  },
  mounted () {
    this.$refs.username.focus()
    this.$refs.username.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.$refs.btnregister.click()
      }
    })
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
          ref="username"
          placeholder="Enter your username"
          autocomplete="off" />
        <button
          ref="btnregister"
          @click="submit()">Submit</button>
      </div>
    </div>`
})
