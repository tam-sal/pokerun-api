const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mainRouter = require('./routes/mainRouter')


//* INSTANTIATING APP
const app = express()

const origins = { origin: 'https://pokerun-api.onrender.com' }

//* MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//* MAIN ROUTER

app.use('/', mainRouter)




//* EXPORT APP
module.exports = app