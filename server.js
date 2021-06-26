const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}?name=idontknwowho`)
})

app.get('/:room', (req, res) => {
  console.log(req.query.name + "fuyge" );
  res.render('room', { roomId: req.params.room , user : req.query.name })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('ShowMessage', message)
  }); 
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT || 3002)