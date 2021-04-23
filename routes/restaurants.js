const express = require('express');
const checkAuth = require('../auth/checkAuth');
const router = express.Router();
const models = require('../models')

/* GET restaurants */
router.get('/', async (req, res) => {
  const restaurants = await models.Restaurant.findAll()

  res.json(restaurants)
})

// Create restaurant
router.post('/', async (req, res) => {
  // check fields
  if (!req.body.category || !req.body.name) {
    // if fields missing send 400
    return res.status(400).json({
      error: 'Please include all fields'
    })
  }

  // creates restaurant
  const restaurant = await models.Restaurant.create({
    category: req.body.category,
    name: req.body.name,
  })

  //send back new restaurant
  res.status(201).json(restaurant)
})

module.exports = router