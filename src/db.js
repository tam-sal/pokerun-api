const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const { PokemonModel, TypeModel } = require('./models')


//* ENV VARIABLES
dotenv.config()
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST } = process.env

//* CREATE A SEQUELIZE INSTANCE
const database = new Sequelize(
  `postgres://pokemon_5mgu_user:ZV3VXz8qCnG4nywHAdZy2gDigFsKCh1z@dpg-cgde40t269v52g76hc8g-a/pokemon_5mgu`,
  {
    logging: false, native: false, dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
)
database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


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