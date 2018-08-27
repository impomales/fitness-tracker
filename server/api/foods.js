const router = require('express').Router()
const {Food} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const foods = await Food.findAll({
      where: req.query
    })
    res.json(foods)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id)
    if (food) res.json(food)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {
    name,
    servingQuantity,
    servingUnit,
    servingWeight,
    date,
    mealTime,
    calories,
    totalFat,
    saturatedFat,
    cholesterol,
    sodium,
    totalCarbohydrate,
    dietaryFiber,
    sugars,
    protein,
    potassium
  } = req.body

  try {
    const food = await Food.create({
      name,
      servingQuantity,
      servingUnit,
      servingWeight,
      date,
      mealTime,
      calories,
      totalFat,
      saturatedFat,
      cholesterol,
      sodium,
      totalCarbohydrate,
      dietaryFiber,
      sugars,
      protein,
      potassium
    })
    res.status(201).json(food)
  } catch (err) {
    next(err)
  }
})
