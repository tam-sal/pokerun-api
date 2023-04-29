const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mainRouter = require('./routes/mainRouter')
require('dotenv').config()


//* INSTANTIATING APP
const app = express()
const { allowed_origins } = process.env
const origins = { origin: allowed_origins }

//* MIDDLEWARES
app.use(express.json())
app.use(cors(origins))
app.use(morgan('dev'))
//* Sanity check

//* MAIN ROUTER

app.use('/', mainRouter)




//* EXPORT APP
module.exports = app