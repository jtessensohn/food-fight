
/* 
    I was thinking of having a list of TeamId's that 
    the user could choose from after logging in.  Or 
    give them the option of creating one.  We could
    also create a search bar for the user to search
    for team.
*/

var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// =================Register Route===================

// Check for username and password on register route.
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



module.exports = router;
