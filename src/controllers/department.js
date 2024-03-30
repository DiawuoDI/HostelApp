const logger = require('../utils/loggerUtils');
const {
    saveDepartment,
    getDepartment,
    getDepartments,
    edithDepartments,
    removeDepartment,
} = require('../helpers/department');

exports.savaDepartment = async (req, res, next) => {
    try {
       const data = req.body
       const department = await saveDepartment({ data })
       res.status(200).json({ department }) 
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.getSingleDepartment = async (req, res, next) => {
     try {
        const { id } = req.params
        const department = await getDepartment(id)
        res.status(200).json({ department })
     } catch (error) {
        logger.error(error)
        next()
     }
}

exports.getAllDepartment = async (req, res, next) => {
    try {
       const departments = await getDepartments({})
       res.status(200).json({ departments }) 
    } catch (error) {
       logger.error(error)
       next() 
    }
}

exports.updateDepartment = async (req, res, next) =>{
    try {
      const { id } = req.params
      const data = req.body
      const department = await edithDepartments({ id, data})
      res.state(200).json({ department })   
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.deleteDepartment = async (req, res, next) =>{
    try {
       const { id } = req.params
       const department = await removeDepartment(id)
       res.status(200).json({ department })
    } catch (error) {
      logger.error(error)
      next()  
    }
}