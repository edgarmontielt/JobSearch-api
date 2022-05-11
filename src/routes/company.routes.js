const { Router } = require('express')
const { verifyToken, isModerator } = require('../middleware')
const Company = require('../services/Company')

function company(app) {
    const router = Router()
    app.use('/api/companies', router)
    const companyService = new Company()

    router.get('/', async (req, res) => {
        const result = await companyService.getAll()
        return res
            .status(200)
            .json(result)
    })

    router.get('/:id', async (req, res) => {
        const result = await companyService.getOne(req.params.id)
        return res
            .status(200)
            .json(result)
    })

    router.post('/create', verifyToken, async (req, res) => {
        const result = await companyService.create(req.user.id, req.body)
        return res
            .status(200)
            .json(result)
    })

    router.delete('/delete/:id', [verifyToken, isModerator], async(req, res) => {
        const company = await companyService.delete(req.params.id)
        return res.json(company)
    })


    router.post('/:id/createjob', [verifyToken, isModerator], async (req, res) => {
        const result = await companyService.addJob(req.params.id, req.body)
        return res
            .status(200)
            .json(result)
    })

    router.delete('/:idCompany/deleteJob/:idJob', [verifyToken, isModerator], async (req, res) => {
        const result = await companyService.deleteJob(req.params.idCompany, req.params.idJob)
        return res
            .status(200)
            .json(result)
    })
}

module.exports = company