const { verifyToken } = require('./verifyToken')
const { isAdmin } = require('./verifyRole')


module.exports = { verifyToken, isAdmin }