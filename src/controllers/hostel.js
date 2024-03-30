const logger = require('../utils/loggerUtils');
const {
    registerHostel,
    getHostel,
    getHostels,
    edithHostel,
    removeHostel
} = require('../helpers/hostel')

exports.saveHostel = async (req, res, next) => {
    try {
        const data = req.body;
        const hostel = await registerHostel( data )
        res.status(200).json({ hostel})
    } catch (error) {
        logger.error(error)
        next()
    }
}

exports.getHostelById = async (req,res, next) => {
    try {
        const { id } = req.params;
        const hostel = await getHostel(id)
        res.status(200).json({ hostel})
    } catch (error) {
     loggeer.error(error)
     next()   
    }
}

exports.getAllHostels = async (req, res, next) => {
    try {
        const hostels = await getHostels();
        res.status(200).json({ hostels}) 
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.updateHostel = async (req,res,next) => {
    try {
       const { id } = req.params;
       const data = req.body; 
       const hostel = await edithHostel(id, data)
       res.status(200).json({ hostel })
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.deleteHostel = async (req, res, next) => {
    try {
        const { id } = req.params
        const hostel = await removeHostel(id)
        res.status(200).json({ hostel })
    } catch (error) {
      logger.error(error)
      next()  
    }
}