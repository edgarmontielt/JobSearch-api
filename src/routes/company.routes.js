const { Router } = require('express')
const { verifyToken } = require('../middleware')
const Company = require('../services/Company')

function company(app) {
    const router = Router()
    app.use('/api/companies', router)
    const companyServ = new Company()

    router.get('/', async (req, res) => {
        const result = await companyServ.getAll()
        return res
            .status(200)
            .json(result)
    })

    router.get('/:id', async (req, res) => {
        const result = await companyServ.getOne(req.params.id)
        return res
            .status(200)
            .json(result)
    })

    router.post('/create', verifyToken, async (req, res) => {
        const result = await companyServ.create(req.user.id, req.body)
        return res
            .status(200)
            .json(result)
    })

    router.post('/:id/createjob', async (req, res) => {
        const result = await companyServ.addJob(req.params.id, req.body)
        return res
            .status(200)
            .json(result)
    })

    router.get('/:id/jobs', (req, res) => {

    })
}

module.exports = company