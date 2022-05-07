const { Router } = require('express')

function cv(app) {
    const router = Router()
    app.use('/cv', router)

    router.get('/', (req, res) => {
        return res.json({ hi: 'El di' })
    })
}

module.exports = cv