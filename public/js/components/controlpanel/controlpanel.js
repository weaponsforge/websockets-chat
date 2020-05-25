// Input prompt for the chat message and submit button.
// Requires the global instance of WebsocketClient (ChatWS).

Vue.component('controlpanel', {
  data: function () {
    return {
      post: ''
    }
  },
  mounted () {
    this.$refs.post.focus()
    this.$refs.post.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.$refs.btnsend.click()
      }
    })
  },
  methods: {
    submit () {
      if (ChatWS.getUser()) {
        ChatWS.sendMessage(this.post)
      } else {
        ChatWS.register(this.post)
      }

      this.post = ''
    }
  },
  template: `
    <div id="controlpanel" class="controlpanel">
      <!-- User Post -->
      <div class="panelitem postcontainer">
        <input type="text" id="post" placeholder="Enter your message"
          v-model="post"
          ref="post" />
      </div>

      <!-- Send Button -->
      <div class="panelitem btnsubmitcontainer">
        <button
          ref="btnsend"
          @click="submit()">Send
        </button>
      </div>
    </div>`
})
