const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization
    const [, token] = bearer.split(' ')

    if (!bearer) return res.status(401).json({ error: true, message: 'You dont have permissions' })

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.id = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({ error: true, message: error })
    }
}


module.exports = { verifyToken }