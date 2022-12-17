const { Router } = require('express')
const router = Router()
const searchController = require('../controllers/searchController')

router.route('/')
    .post(searchController.getImg)

module.exports = router