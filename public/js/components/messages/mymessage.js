// Component template for current User's own Post
Vue.component('mymessage', {
  template:
  `<div class='usermessagecontainer messagealignright'>
    <div class='usermessage' v-bind:style="{ background: bgcolor }">{{ message }}</div>
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
    },
    bgcolor: {
      type: String,
      default: ''
    }
  }
})
