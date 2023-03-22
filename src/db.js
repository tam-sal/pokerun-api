const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const { PokemonModel, TypeModel } = require('./models')


//* ENV VARIABLES
dotenv.config()
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_DIALECT, DB_HOST } = process.env

//* CREATE A SEQUELIZE INSTANCE
const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
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