const express = require('express')
const router = express.Router()

const request = require('../../../controllers/request')

router.get('/', request.requestRoom)
router.get('/', request.getRequests)
router.get('/analytics', request.getAnalytics)
router.get('/:studentId', request.getRequest_by_studentId)
router.get('/:status',request.getRequestsByStatus)
router.patch('/:id', request.updateRoomRequest)
router.delete('/:id', request.deleteRoomRequest)

module.exports = router;