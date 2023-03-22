const axios = require("axios")
const { Pokemon, Type } = require('../db')


const singlePokeHandler = async (url) => {

  try {
    const { data } = await axios.get(url)
    return {
      'id': +data.id,
      'name': data.name,
      'hp': data.stats?.map(el => el.base_stat)[0],
      'attack': data.stats?.map(el => el.base_stat)[1],
      'defense': data.stats?.map(el => el.base_stat)[2],
      'speed': data.stats?.map(el => el.base_stat)[5],
      'height': data.height,
      'weight': data.weight,
      'img': data.sprites.other.dream_world.front_default,
      'createdInDb': false,
      'Types': data.types.map((t) => {
        return {
          'id': +t.type.url.slice(-3, -1).replace('/', ''),
          'name': t.type.name
        }
      })
    }
  }

  catch (error) {
    return error.message
  }
}

const getApiData = async () => {

  const baseUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40'
  try {
    const { data: seed } = await axios.get(baseUrl)
    const { results } = seed
    const urls = results.map(res => res.url)
    const fetched = await Promise.all(
      urls.map(async (url) => {
        let res = await singlePokeHandler(url)
        return res
      })
    )
    return fetched
  }

  catch (error) {
    return error.message
  }
}


const getDbData = async () => {
  if (await Pokemon.count()) {

    try {
      const dbInfo = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }
      })
      return dbInfo
    }

    catch (error) {
      return error.message
    }
  }
  return []

}

const getAllPokes = async () => {

  try {
    const apiData = await getApiData()
    const dbData = await getDbData()
    if (dbData.length && apiData.length) return [...apiData, ...dbData]
    if (dbData.length) return dbData
    return apiData
  }

  catch (error) {
    return error.message
  }

}

const createNewPokemon = async (name, hp, attack, defense, speed, height, weight, img, type, createdInDb) => {

  const newPoke = await Pokemon.create(
    { name, hp, attack, defense, speed, height, weight, img, type, createdInDb }
  )
  const addedTypeDb = await Type.findAll({
    where: {
      name: type
    }
  })

  await newPoke.addType(addedTypeDb)

  return newPoke
}

const pokeById = async (id) => {
  const allPokes = await getAllPokes()
  const foundPoke = await allPokes.find(poke => poke.id == id)
  if (!foundPoke) throw new Error(`Pokemon ID: <${id}> doesn't exist.`)
  return foundPoke
}

const deletePokeById = async (id) => {
  let allPokes = await getAllPokes()
  let pokeToDel = await pokeById(id)
  if (pokeToDel.createdInDb) {
    await pokeToDel.destroy()
    allPokes = await getAllPokes()
  }

  else {
    allPokes = await allPokes.filter(poke => poke.id !== pokeToDel.id)
  }

  return allPokes
}



module.exports = {
  getApiData,
  getDbData,
  getAllPokes,
  createNewPokemon,
  pokeById,
  deletePokeById
}