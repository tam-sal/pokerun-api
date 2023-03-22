const { Router } = require('express')
const { pokeRouter, typesRouter } = require('./')


const mainRouter = Router()


//* Landing
mainRouter.get('/', (req, res) => {
  return res.json({ status: 'Ok', server: 'successfully connected' })
})

//* Routes
mainRouter.use('/pokemons', pokeRouter)
mainRouter.use('/types', typesRouter)

//* Error Handler
mainRouter.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    error: 'Invalid API Endpoint',
    'valid endpoints': ['/pokemons',
      '/pokemons/{idPokemon}',
      '/pokemons?name="..."',
      '/types']
  })
})

//* Expport mainRouter
module.exports = mainRouter
