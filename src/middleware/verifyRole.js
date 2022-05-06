const UserModel = require('../models/User')

const isAdmin = async (req, res, next) => {
    try {
        const { id } = req
        const user = await UserModel.findById(id)
        if (user.role === 'admin') {
            next()
            return // End method
        }
        return res.status(401).json({ error: true, message: 'You dont have permissions' })
    } catch (error) {
        return res.status(401).json({ error: true, message: error })
    }
}

module.exports = { isAdmin }