function checkAuth(req, res, next) {
  // is user logged in
  const { user } = req.session;
  // if not logged in, send 401
  if (!user) {
    return res.status(401).json({
      error: 'Not logged in'
    })
  } else {
    next()
  }
}

module.exports = checkAuth