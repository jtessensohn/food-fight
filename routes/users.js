var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// =================Register Route===================
// Check for username and password on register post route.
router.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: "Please include username and password."
    })
  }

  // Check database for existing user.
  const user = await db.User.findOne({
    where: {
      username: req.body.username,
    }
  })

  // If user exists, send error.
  if (user) {
    return res.status(400).json({
      error: "Username already in use.  Try a different username."
    })
  }

  // Hash password using bcrypt.
  const hash = await bcrypt.hash(req.body.password, 10)
  
  // Create user.
  const newUser = await db.User.create({
    username: req.body.username,
    password: hash
  })

  // Respond with success message.
  return res.status(201).json({
    success: "Food Fight is a login away!"
  })
})

//=================Login Route=====================
// Check for username and password on login post route.
router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: "Please include username and password."
    })
  }

  // Find username in db.
  const user = await db.User.findOne({
    where: {
      username: req.body.username
    }
  })

  // If there is no user send error.
  if (!user) {
    return res.status(404).json({
      error: "No user with that username found, please try again."
    })
  }

  // Compare entered password to db password
  const match = await bcrypt.compare(req.body.password, user.password)

  // If there is no match send error.
  if (!match) {
    return res.status(401).json({
      error: "Password is incorrect, try again please."
    })
  }

  // Create session for user.
  req.session.user = user

  // Login user with id, username, and time.
  res.json({
    id: user.id,
    username: user.username,
    updatedAt: user.updatedAt
  })
})

//===============Logout Route===================
// Create a get that turns session to null.
router.get('/logout', (req, res) => {
  req.session.user = null

  // Let user know they have logged out.
  res.json({
    success: "Logged out successfully, the Food Fight rages on!"
  })
})

//===============Current User===================
router.get('/current', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      updatedAt: user.updatedAt
    });
  } else {
    res.status(401).json({
      error: 'Not logged in'
    })
  }
})

//=================AddTeamId==================
// join team route
router.post('/team', async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({
      error: "Please include id"
    })
  }

  // get userId from session
  const user = await db.User.findByPk(req.session.user.id)

  // get teamId from req check /src/pages/Team.js
  const team = await db.Team.findByPk(req.body.id)

  // this shouldn't happen
  if (!team) {
    return res.status(404).json({
      error: "Team does not exists"
    })
  }

  user.setTeam(team)

  res.json({
    success: "Successfully added user to team"
  })
})

module.exports = router;
