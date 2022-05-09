const { Router } = require('express')
const { verifyToken } = require('../middleware')
const CVService = require('../services/cv')

function cv(app) {
    const router = Router()
    app.use('/api/cv', router)
    const cvServ = new CVService()

    router.post('/create', verifyToken, async (req, res) => {
        const { user: { id } } = req
        const result = await cvServ.create(id, req.body)
        return res.json(result)
    })

    router.get('/:id', verifyToken, async (req, res) => {
        const result = await cvServ.getCVandUser(req.params.id)
        return res.json(result)
    })


}

module.exports = cv