const UserModel = require('../models/User')

const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.id)
        if (user.role === 'admin') {
            return next()
        }
        return res.status(401).json({ error: true, message: 'You dont have permissions' })
    } catch (error) {
        return res.status(401).json({ error: true, message: error })
    }
}

module.exports = { isAdmin }