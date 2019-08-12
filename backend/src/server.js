const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const server = require('http').Server(app)
const socket = require('socket.io')(server)

const connectedUsers = {

}

socket.on('connection', conSocket => {
    const { user } = conSocket.handshake.query
    connectedUsers[user] = conSocket.id
})

mongoose.connect('mongodb+srv://rudfenix:rudfenix@rudfenix-ahzrx.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
app.use((req, res, next) => {
    req.socket = socket
    req.connectedUsers = connectedUsers
    return next()
})
app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333, () => {
    console.log('Is running')
})