// Function to check authentication.
function checkAuth(req, res, next) {
    const { user } = req.session;
    // If there is no user send error else do something.
    if (!user) {
        return res.status(401).json({
            error: "You need to be logged in to do that."
        }) 
    } else {
        next();
    }
}