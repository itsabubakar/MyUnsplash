const { Router } = require('express')
const router = Router()
const imgController = require('../controllers/imgControllers')

router.route('/')
    .get(imgController.getAllImg)
    .post(imgController.postImage)
    .delete(imgController.deleteImg)

module.exports = router