const Sequelize = require('sequelize')
const db = require('../db')

const Food = db.define('food', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  servingQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0}
  },
  servingUnit: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // weight in grams.
  servingWeight: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {min: 0}
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {isDate: true}
  },
  mealTime: {
    type: Sequelize.ENUM,
    values: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  calories: {type: Sequelize.FLOAT},
  totalFat: {type: Sequelize.FLOAT},
  saturatedFat: {type: Sequelize.FLOAT},
  cholesterol: {type: Sequelize.FLOAT},
  sodium: {type: Sequelize.FLOAT},
  totalCarbohydrate: {type: Sequelize.FLOAT},
  dietaryFiber: {type: Sequelize.FLOAT},
  sugars: {type: Sequelize.FLOAT},
  protein: {type: Sequelize.FLOAT},
  potassium: {type: Sequelize.FLOAT}
})

module.exports = Food
