var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const db = require('../models');

router.get('/', async function(req, res) {
    const fights = await db.Fight.findAll({
        include: [{
            model: db.User,
            attributes: ['username', 'id']
        },
        {
           model: db.Team,
           attributes: ('name', 'id') 
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

module.exports = router;