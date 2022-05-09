const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) return res.status(401).json({ error: true, message: 'No token provider' })

    const [, token] = bearer.split(' ')

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ failed: true, error })
    }
}

module.exports = { verifyToken }