// Component template for other User's Post
Vue.component('usermessage', {
  template:
  `<div class="usermessagecontainer">
    <div class="username">{{ userid }}</div>
    <div class="usermessage">{{ message }}</div>
  </div>`,
  props: {
    userid: {
      type: String,
      default: '001'
    },
    message: {
      type: String,
      default: ''
    }
  }
})
