const isAdmin = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            return next()
        }
        return res.status(401).json({ error: true, message: 'You dont have permissions' })
    } catch (error) {
        return res.status(401).json({ error: true, message: error })
    }
}

module.exports = { isAdmin }