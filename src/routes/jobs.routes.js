const { Router } = require('express')
const { verifyToken } = require('../middleware')

function jobs(app) {
    const router = Router()
    app.use('/api/jobs', router)

    router.get('/', (req, res) => {
        console.log(req.user);
        return res.json({ hi: 'World' }) 
    })
}

module.exports = jobs