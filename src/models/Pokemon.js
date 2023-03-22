const { DataTypes } = require('sequelize')


const Pokemon = (database) => {
  database.define('Pokemon',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: -1
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: -1
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: -1
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }

    },

    {
      timestamps: false,
      freezeTableName: true
    })
}
module.exports = Pokemon