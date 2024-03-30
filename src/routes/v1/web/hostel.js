const express = require('express');
const router = express.Router();

const hostel = require('../../../controllers/hostel');

router.post('/', hostel.saveHostel);
router.get('/', hostel.getAllHostels);
router.get('/:id', hostel.getHostelById);
router.patch('/:id', hostel.updateHostel);
router.delete('/:id', hostel.deleteHostel);