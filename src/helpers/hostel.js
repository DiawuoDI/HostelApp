const prisma = require('../utils/prismaUtils')

const registerHostel = async (data) => {
    const hostel = await prisma.hostel.create({
        data,
    })
    return hostel;
}

const getHostel = async (data) => {
    const hostel =  await prisma.hostel.findUnique({
        where: {
            id,
        },
    });
    return hostel;
}

const getHostels = async () => {
    const hostel = await prisma.hostel.findMany({
        orderBy: {
            name: 'desc',
        },
    });
    return hostel;
}

const edithHostel = async ( id, data) => {
    const hostel = await prisma.hostel.findMany({
        where: {
            id,
        },
        data,
    })
    return hostel;
}

const removeHostel = async (id) => {
    const hostel = prisma.hostel.delete({
        where: {
            id,
        }
    })
    return hostel;
}

module.exports = {
    registerHostel,
    getHostel,   
    getHostels,
    edithHostel,
    removeHostel,
};