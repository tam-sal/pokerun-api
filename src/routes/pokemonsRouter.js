const { Router } = require('express')
const pokeRouter = Router()
const {
  getApiData,
  getDbData,
  getAllPokes,
  createNewPokemon,
  pokeById,
  deletePokeById
} = require('../controllers/pokemonControllers')

//* GET [allPokemons / byName(query)]

pokeRouter.get('/', async (req, res) => {
  const { name } = req.query
  const allPokes = await getAllPokes()

  try {
    let returnedPokes
    if (name) {
      const byName = await allPokes.filter(poke => poke.name.toLowerCase() === name.toLowerCase())
      if (byName) returnedPokes = byName
      else throw Error(`<${name}> not found`)
    }

    else {
      if (allPokes.length) returnedPokes = allPokes
      else throw Error('No pokemons found!')
    }

    return res.json(returnedPokes)
  }


  catch (error) {
    res.status(404).json({ error: error.message })
  }

})

//* Get Poke by ID (params)
pokeRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const foundPoke = await pokeById(id)
    return res.json(foundPoke)
  }
  catch (error) {
    return res.status(404).json({ error: error.message })
  }
})

pokeRouter.post('/', async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, img, type, createdInDb } = req.body

  try {
    const createdPoke = await createNewPokemon(name, +hp, +attack, +defense, speed, height, weight, img, type, createdInDb)
    await createdPoke

    return res.json({ msg: 'Pokemon Successfully Created', 'PokemonCreated': createdPoke })
  }

  catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

//* Delete Poke by id (params)
pokeRouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    const existingPokes = await deletePokeById(id)
    return res.status(200).json({ msg: 'Pokemon successfully deleted', 'actual_pokemons': existingPokes })

  }

  catch (error) {
    return res.status(404).json({ error: error.message })
  }
})






module.exports = pokeRouter