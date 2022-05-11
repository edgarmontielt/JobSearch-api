const { Router } = require('express')
const Jobs = require('../services/jobs')


function jobs(app) {
    const router = Router()
    app.use('/api/jobs', router)
    const jobServ = new Jobs()

    router.get('/', async (req, res) => {
        const jobs = await jobServ.getAll()
        return res.status(200).json(jobs)
    })
}

module.exports = jobs