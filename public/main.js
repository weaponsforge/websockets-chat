// Connect the client to the websockets server
const socket = new WebSocket('ws://localhost:3000')

const init = function () {
  socket.addEventListener('open', (event) => {
    console.log('connected to server')
  })
}