const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const { PokemonModel, TypeModel } = require('./models')


//* ENV VARIABLES
dotenv.config()
const { RAILWAY } = process.env
const { LOCAL_DB_USER, LOCAL_DB_PASS, LOCAL_DB_NAME, LOCAL_DB_PORT, LOCAL_DB_HOST } = process.env

//* CREATE A SEQUELIZE INSTANCE
const database = new Sequelize(
  `${RAILWAY}`,
  {
    logging: console.log,
    native: false
  }
)



//* MODELS INJECTION - Connect Model to DB and Create its corresponding table 
PokemonModel(database)
TypeModel(database)



//* RELATIONSHIPS
const { Pokemon, Type } = database.models
Pokemon.belongsToMany(Type, { through: 'PokeType' })
Type.belongsToMany(Pokemon, { through: 'PokeType' })


//* EXPORTING DATABASE AND MODELS
module.exports = {
  database,
  ...database.models
}