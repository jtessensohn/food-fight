var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const db = require('../models');

// Look for all teams, also be able to add attributes
// from other models.
router.get('/', async function(req, res) {
    const teams = await db.Team.findAll({
        include: [{
            model: db.User,
            attributes: ['username', 'id']
        },
        {
            model: db.Fight,
            attributes: ['name', 'id']
        }]
    })
    res.json(teams);
})

// Look for team name, if none error.  Create team.
router.post('/', checkAuth, async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Please include team name, the fight is stronger in numbers."
        })
    }

    // Look for existing team.
    const team = await db.Team.findOne({
        where: {
            name: req.body.name,
        }
    })

    // If team exists, send error.
    if (team) {
        return res.status(400).json({
            error: "Team name already in use."
        })
    }

    // Create new team.
    const newTeam = await db.Team.create({
        name: req.body.name,
    })

    res.status(201).json(newTeam)
})

module.exports = router;