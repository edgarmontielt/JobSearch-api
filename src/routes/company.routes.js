const { Router } = require('express')
const { verifyToken } = require('../middleware')
const Company = require('../services/Company')

function company(app) {
    const router = Router()
    app.use('/api/companies', router)
    const companyServ = new Company()

    router.get('/', verifyToken, async (req, res) => {
        const result = await companyServ.getAll()
        return res.status(200).json(result)
    })

    router.post('/create', verifyToken, async (req, res) => {
        const result = await companyServ.create(req.user.id, req.body)
        return res.status(200).json(result)
    })
}

module.exports = company