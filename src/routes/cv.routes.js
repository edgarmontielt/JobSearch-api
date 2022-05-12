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
        return res
            .status(200).json(result)
    })

    router.get('/:id', verifyToken, async (req, res) => {
        const result = await cvServ.getCVandUser(req.params.id)
        return res
            .status(200).json(result)
    })

    router.put('/update/:id', verifyToken, async (req, res) => {
        const result = await cvServ.update(req.params.id, req.body)
        return res.status(200).json(result)
    })

    router.put('/update/skills/:id', verifyToken, async (req, res) => {
        const result = await cvServ.updateSkills(req.params.id, req.body)
        return res.status(200).json(result)
    })

    router.put('/update/languages/:id', verifyToken, async (req, res) => {
        const result = await cvServ.addIdiom(req.params.id, req.body)
        return res.status(200).json(result)
    })
}

module.exports = cv