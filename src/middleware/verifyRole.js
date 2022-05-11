const isAdmin = (req, res, next) => {
    try {
        for (const role of req.user.role) {
            if (role.name === 'admin') return next()
        }
        return res
            .status(401)
            .json({ error: true, message: 'You dont have permissions' })
    } catch (error) {
        return res
            .status(401)
            .json({ error: true, message: error })
    }
}

const isModerator = (req, res, next) => {
    try {
        for (const role of req.user.role) {
            if (role.name === 'moderator') return next()
        }
        return res
            .status(401)
            .json({ error: true, message: 'You dont have permissions' })
    } catch (error) {
        return res
            .status(401)
            .json({ error: true, message: error })
    }
}

module.exports = { isAdmin, isModerator }