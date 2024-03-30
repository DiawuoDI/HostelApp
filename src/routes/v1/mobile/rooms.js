const express = require(express);
const router = express.Router();

const room = require('../../../controllers/room');
const requestRoom = require('../../../controllers/roomRequest');

router.post('/request-room', requestRoom.requestRoom);
router.get('/available', room.getAvailableRooms);
router.get('/:studentId', requestRoom.getRequest_by_studentId);

module.exports = router