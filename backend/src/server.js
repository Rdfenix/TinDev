const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

mongoose.connect('mongodb+srv://rudfenix:rudfenix@rudfenix-ahzrx.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(3333, () => {
    console.log('Is running')
})