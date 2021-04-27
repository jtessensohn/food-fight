const express = require('express');
const checkAuth = require('../auth/checkAuth');
const db = require('../models');
const router = express.Router();
const models = require('../models')

/* GET restaurants */
router.get('/', async (req, res) => {
  const restaurants = await models.Restaurant.findAll()

  res.json(restaurants)
})

// Create restaurant
router.post('/', checkAuth, async (req, res) => {
  // check fields
  if (!req.body.category || !req.body.name) {
    // if fields missing send 400
    return res.status(400).json({
      error: 'Please include all fields'
    })
  }

  const validateRestaurant = await db.Restaurant.findOne({
    where: {
      name: req.body.name,
    }
  })

  // If validateRestaurant exists, send error.
  if (validateRestaurant) {
    return res.status(400).json({
      error: "Another fighter has made that restaurant. They have your back for now."
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