const { Router } = require('express')
const { verifyToken } = require('../middleware')
const Jobs = require('../services/jobs')


function jobs(app) {
    const router = Router()
    app.use('/api/jobs', router)
    const jobServ = new Jobs()

    router.get('/', async (req, res) => {
        const jobs = await jobServ.getAll()
        return res.status(200).json(jobs)
    })

    router.get('/:id', async (req, res) => {
        const job = await jobServ.getOne(req.params.id)
        return res.json(job)
    })

    router.post('/newAplicant/:idJob', verifyToken, async (req, res) => {
        const result = await jobServ.addAplicant(req.user.id, req.params.idJob)
        return res.json(result)
    })
}

module.exports = jobs