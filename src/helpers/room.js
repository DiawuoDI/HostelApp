const prisma = require('../utils/prismaUtils');

const registerRoom = async (data) => {
    const room = await prisma.rooms.create({
        data,
    })
    return room
}

const registerRooms = async (data) => {
    const room = await prisma.rooms.createMany({
       data
    })
    return room
}

const getRoom = async (id) => {
    const room = await prisma.rooms.findUnique({
        where:{
            id
        },
        include: {
            allocation: {
                include: {
                    student: true,
                }
            }
        }
    })
    return room
}

const getRooms = async () => {
    const rooms = await prisma.rooms.findMany({
        orderBy: {
         createdAt: 'desc',
    },
    })
    return rooms
}

const edithRooms = async (id, data) => {
    const room = await prisma.rooms.delete({
        where: {
            id,
        },
        data,
    })
    return room
}

const removeRoom = async (id) => {
    const room = await prisma.rooms.delete({
        where: {
            id
        },
    })
    return room
}

module.exports = {
    registerRoom,
    registerRooms,
    getRoom,
    getRooms,
    edithRooms,
    removeRoom
}