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
    const food = await Food.findById(req.params.id);
    if (food) res.json(food);
  } catch (err) {
    next(err)
  }
})
