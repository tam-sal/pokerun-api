const { Router } = require('express')
const typesRouter = Router()
const {
  getTypesFromDb
} = require('../controllers/typeControllers')

typesRouter.get('/', async (req, res) => {
  try {
    const typesFromDb = await getTypesFromDb()
    return res.json(typesFromDb)
  }

  catch (error) {
    return res.status(404).json({ error: error.message })
  }
})

module.exports = typesRouter