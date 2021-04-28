var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const db = require('../models');

router.get('/', async function (req, res) {
    const fights = await db.Fight.findAll({
        include: [{
            model: db.User,
            attributes: ['username', 'id']
        },
        {
            model: db.Team,
            attributes: ['name', 'id']
        }]
    })
    res.json(fights)
})

router.post('/', checkAuth, async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Please include name, all battles have names."
        })
    }

    const fight = await db.Fight.create({
        name: req.body.name
    })

    res.status(201).json(fight);
})


//1. get current fight
// findAll getOrderBy Date descending createdAt limit 1
router.get('/current', async (req, res) => {
    const fight = await db.Fight.findAll({
        where: {
            TeamId: req.session.user.TeamId
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
        include: [
            db.Competitor,
             db.Restaurant,
              {model:db.Competitor,as:"Winner",include:db.Restaurant}
        
        ]

    })
    res.send(fight[0])
})

//2. add competitor to new fight
// same as adding user to team.
router.post('/:id/competitors', async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            error: "please include a competitor id"
        })
    }

    const fight = await db.Fight.findByPk(req.params.id)

    const restaurant = await db.Restaurant.findByPk(req.body.id)
    if (!restaurant) {
        return res.status(404).json({
            error: "could not find restaurant with that id"
        })
    }
    if (await fight.hasRestaurant(restaurant)) {
        return res.status(400).json({
            error: "Competitor already added."
        })
    }

    await fight.createCompetitor({
        points: 0,
        UserId: req.session.user.id,
        RestaurantId: restaurant.id
    })

    res.json({
        success: "added competitor to fight"
    })
})


//3. remove competitor to new fight
// remove competitor
router.delete('/:id/competitors/:restaurantId', async (req, res) => {
    const fight = await db.Fight.findByPk(req.params.id)
    const restaurant = await db.Restaurant.findByPk(req.params.restaurantId)
    if (!restaurant) {
        return res.status(400).json({
            error: "could not find that restaurant "
        })
    }
    if (!(await fight.hasRestaurant(restaurant))) {
        return res.status(400).json({
            error: "Competitor already removed."
        })
    }
    await db.Competitor.destroy({
        where: {
            RestaurantId: restaurant.id,
            FightId: fight.id
        }
    })
    res.status(200).json({
        success: "competitor removed."
    })
})


// pick random winner
router.get('/current/winner', async (req, res) => {
    const fight = (await db.Fight.findAll({
        order: [['createdAt', 'DESC']],
        limit: 1,
        include: [db.Competitor, db.Restaurant]
    }))[0]
    console.log(fight)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    const winnerId = getRandomInt(0, fight.Competitors.length)
    const winner = fight.Competitors[winnerId]
    await fight.setWinner(winner)
    res.status(200).json(await winner.getRestaurant())
})
//need to winner column to fight table(connection to restaurant )
// getAll competitors for a fight, pick 1.
// vote for competitor
// find competitor and increase vote by 1.


module.exports = router;