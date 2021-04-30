const express = require('express');
const checkAuth = require('../auth/checkAuth');
const db = require('../models');
const router = express.Router();
const models = require('../models')

router.get('/', async (req, res) => {
  const competitors = await models.Competitor.findAll({
    include: [
      {
        model: models.User,
        attributes: ['id']
      },
      {
        model: models.Restaurant,
        attributes: ['id']
      },
      {
        model: models.Fight,
        attributes: ['id']
      }
    ],
  })

  res.json(competitors)
})

router.post('/', async (req, res) => {
  const newCompetitor = await db.Competitor.create({
    usedAt: Date(),
    points: 0,
    include: [
      {
        model: models.User,
        attributes: ['id']
      },
      {
        model: models.Restaurant,
        attributes: ['id']
      },
      {
        model: models.Fight,
        attributes: ['id']
      }
    ],
  })

  res.status(201).json(newCompetitor)
})


module.exports = router