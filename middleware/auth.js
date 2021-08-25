const jwt = require('jsonwebtoken')
const User = require('../models/user')

// check if user is authenticated or not
exports.isAuthenticated = async(req, res, next) => {

    const { token } = req.cookies

    if(!token) {
        return res.status(401).json({
            error: 'Login first to access this resource'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()

}

// handling authorization roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                error: `Role (${req.user.role}) is not allowed to access this resource`
            })
        }
        next()
    }
}