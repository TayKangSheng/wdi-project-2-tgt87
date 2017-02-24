const express = require('express')
const router = express.Router()
const contributionController = require('../controllers/contribution_controller')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

router.get('/', contributionController.list)

router.get('/:id', contributionController.show)

router.post('/', upload.single('image'), contributionController.create)

router.get('/:id/edit', contributionController.edit)

router.put('/:id', contributionController.update)

router.delete('/:id', contributionController.delete)

router.post('/:id', contributionController.comment)

module.exports = router
