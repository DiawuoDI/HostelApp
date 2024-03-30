const express = require('express');
const router = express.Router();

const department = require('../../../controllers/department');

router.post('/', department.saveDepartment);
router.get('/', department.getAllDepartment);
router.get('/:id', department.getDepartmentById);
router.patch('/:id', department.updateDepartment);
router.delete('/:id', department.deleteDepartment);

module.exports = router;