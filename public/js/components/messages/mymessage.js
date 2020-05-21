// Component template for current User's own Post
Vue.component('mymessage', {
  template:
  `<div class='usermessagecontainer messagealignright'>
    <div class='usermessage'>{{ message }}</div>
    <div class='username'>{{ userid }}</div> 
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