const express = require('express');
const router = express.Router();

const alloation = require('../../../controllers/allocation');

router.post('/', alloation.saveAllocation);
router.get('/', alloation.getAllAllocaion);
router.get('/:id', alloation.findAllocationById);
router.get('/all/analytics', alloation.getAnalytics);
router.get('/:id', alloation.updateAllocation);
router.get('/:id', alloation.deleteAllocation);

module.exports = router;