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
