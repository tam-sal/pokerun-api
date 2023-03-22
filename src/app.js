const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mainRouter = require('./routes/mainRouter')


//* INSTANTIATING APP
const app = express()



//* MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//* MAIN ROUTER

app.use('/', mainRouter)




//* EXPORT APP
module.exports = app