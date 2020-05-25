// Component template for other User's Post
Vue.component('usermessage', {
  template:
  `<div class="systemmessagecontainer">
    <div class="username">{{ userid }}</div>
    <div class="usermessage" v-bind:style="{ background: bgcolor }">{{ message }}</div>
  </div>`,
  props: {
    userid: {
      type: String,
      default: '001'
    },
    message: {
      type: String,
      default: ''
    },
    bgcolor: {
      type: String,
      default: ''
    }
  }
})
