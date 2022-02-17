import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
const room = 'slideshow'
let currentId: number

Ws.io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(room)

    if (isNaN(currentId)) {
      currentId = data.id
    }

    socket.on('change', (data) => {
      currentId = data.id
      socket.in(room).emit('change', { id: currentId })
    })

    socket.on('refresh', () => {
      socket.in(room).emit('refresh')
    })
  })
})
