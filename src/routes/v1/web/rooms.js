const express = require('express')
const router = express.Router()

const room = require('../../../controllers/room')

router.post('/', room.saveRooms)
router.post('/single', room.saveRoom)
router.get('/', room.getAllRooms)
router.get('/available', room.getAvailableRooms)
router.get('/analytics', room.noOfRoomByStatus)
router.get('/:status', room.getRoomsByStatus)
router.get('/:id', room.getSingleRoom)
router.patch('/:id', room.updateRoom)
router.delete('/:id', room.deleteRoom)

module.exports = router