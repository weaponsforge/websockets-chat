// Input prompt for the chat message and submit button.
// Requires the global instance of WebsocketClient (ChatWS).

Vue.component('controlpanel', {
  data: function () {
    return {
      post: ''
    }
  },
  methods: {
    submit () {
      if (ChatWS.getUser()) {
        ChatWS.sendMessage(this.post)
      } else {
        ChatWS.register(this.post)
      }
    }
  },
  template: `
    <div id="controlpanel" class="controlpanel">
      <!-- User Post -->
      <div class="panelitem postcontainer">
        <input type="text" id="post" placeholder="Enter your message" v-model="post" />
      </div>

      <!-- Send Button -->
      <div class="panelitem btnsubmitcontainer">
        <button
          @click="submit()">Send
        </button>
      </div>
    </div>`
})
