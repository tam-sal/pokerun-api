const axios = require('axios')
const { Type } = require('../db')

const getApiTypes = async () => {
  const baseUrl = 'https://pokeapi.co/api/v2/type'
  try {
    const seed = await axios.get(baseUrl)
    const { data } = seed
    const types = data.results?.map(res => {
      return {
        'name': res.name
      }
    })

    return types
  }

  catch (error) {
    console.log(error.message)
  }
}

const getTypesFromDb = async () => {
  if (await Type.count() === 0) {
    const typesFromApi = await getApiTypes()
    await Type.bulkCreate(typesFromApi)
    return await Type.findAll()
  }
  else return await Type.findAll()
}


module.exports = { getTypesFromDb }