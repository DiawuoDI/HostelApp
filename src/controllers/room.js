const prisma = require('../utils/prismaUtils');
const logger = require('../utils//loggerUtils')
const {
    registerRoom,
    registerRooms,
    getRoom,
    getRooms,
    edithRooms,
    removeRoom
} = require('../helpers/room')

exports.saveRoom = async (req, res, next) => {
    try {
        const data = req.body
        data.status = 'Vacant'
        const room = await registerRoom(data)
        res.status(201).json({ room })
    } catch (error) {
       logger.error(error)
       next() 
    }
}

exports.saveRooms = async (req, res, next) => {
    try {
        const data = req.body;
        const room = await registerRooms(data)
        res.status(200).json({ room })
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.getSingleRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await getRoom(id)
        res.status(200).json({ room })
    } catch (error) {
       logger.error(error)
       next()
    }
}

exports.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await getRooms()
        res.status(200).json({ rooms })
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.noOfRoomByStatus = async (req, res, next) => {
    try {
        const roomsGroupedByStatus = await prisma.rooms.groupBy({
            by: ['status', 'blockName'],
            _count: true,  
        })
        res.status(200).json({ roomsGroupedByStatus })
    } catch (error) {
        logger.error(error)
        next()
    }
}

exports.getAvailableRooms = async (req, res, next) => {
    try {
        const room = await prisma.rooms.findMany({
            where: {
                status: {
                    in: ['Vacant', 'Partially_Occupied']
                }
            },
            include: {
                _count: {
                    select: {
                        allocation: true,
                    }
                }
            }
        })
        res.status(200).json({ room })
    } catch (error) {
       logger.error(error)
       next() 
    }
}

exports.getRoomsByStatus = async (req, res, next) => {
    try {
        const { status } = req.params
        const validStatus = ['Vacant', 'Partially_Occupied', 'Occupied']
        if(!validStatus.includes(status)) {
            throw new Error('Please Enter the right option')
        }else{
            const rooms = await prisma.rooms.findMany({
                where: {status},
            })
            res.status(200).json({ rooms 
            })
        }
    } catch (error) {
      logger.error(error);
      next()  
    }
}

exports.updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body 
        const room = await edithRooms(id, data)
        res.status(200).json({ room })
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        const room = await removeRoom(id)
        res.status(200).json({ room })
    } catch (error) {
      logger.error(error)
      next()  
    }
}