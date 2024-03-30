const prisma = require('../utils/prismaUtils')
const logger = require('../utils/loggerUtils');

exports.saveAllocation = async (req, res, next) => {
    try {
       const data = req.body
       const allocation = await prisma.allocation.create({
        data
       })
       res.status(200).json({ allocationDetails: allocation}) 
    } catch (error) {
       logger.error(error)
       next() 
    }
}

exports.findAllocationById = async (req, res, next) => {
    try {
       const { id } = req.params
       const allocation = await prisma.allocation.findUnique({
        where: {
            id
        }
       })
       res.status(200).json({ allocationDetails: allocation})  
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.updateAllocation = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const allocation = await prisma.allocation.update({
            where: {
                id
            },
            data,
        });
        res.status(200).json({ allocationDetails: allocation}) 
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.getAllAllocaion = async (req, res, next) => {
    try {
        const allocation = await prisma.allocation.findMany({
            orderBy: {
                createAt: 'desc'
            }
        })
        res.status(200).json({allocation})
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.getAnalytics = async (req, res, next) => {
    try {
        const allocation = await prisma.allocation.groupBy({
            by: ['roomsId', studentId],
            _count: true
        })
        res.status(200).json({ allocation })
    } catch (error) {
      logger.error(error)
      next()
    }
}

exports.deleteAllocation = async (req, res, next) => {
    try {
       const { id } = req.params
       const allocation = await prisma.allocation.delete({
        where: {
            id
        }
       })
       res.status(200).json({ allocation })  
    } catch (error) {
       logger.error(error)
       next() 
    }
}