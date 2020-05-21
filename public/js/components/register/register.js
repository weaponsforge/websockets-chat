// Input prompt for chat username registration
// Requires the global instance of WebsocketClient (ChatWS).

Vue.component('register', {
  data: function() {
    return {
      username: '',
      messages: []
    }
  },
  methods: {
    submit() {
      ChatWS.register(this.username)
    }
  },
  template:
    `<div class="registercontainer" id="register" >
      <div>
        <input id="username" v-model="username" />
        <button @click="submit()">Submit</button>
      </div>
    </div>`
})