const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const { PokemonModel, TypeModel } = require('./models')


//* ENV VARIABLES
dotenv.config()
const { RAILWAY } = process.env

//* CREATE A SEQUELIZE INSTANCE
const database = new Sequelize(
  RAILWAY,
  {
    logging: console.log,
    native: false,
    dialect: 'postgres'
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