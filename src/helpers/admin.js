const prisma = require('../utils/prismaUtils')

const addAdmin = async (data) => {
    const admin = await prisma.admin.create({
        data,
    })
    return admin
}

const getAdmin  = async () => {
    const admin = await prisma.admin.findUnique({
        where: {
            id
        }
    })
    return admin
}

const getAdmins = async () => {
    const admin = await prisma.admin.findMamy({
        orderBy: {
            createdAt: 'desc', 
        }
    })
    return admin
}

const edithAdmin = async (id, data) => {
    const admin = await prisma.admin.update({
        where: {
            id,
        },
        data
    })
    return admin
}

const deleteAdmin = async (id) => {
    const admin = await prisma.admin.delete({
        where: {
            id
        }
    })
    return admin
}

module.exports = {
    addAdmin,
    getAdmin,
    getAdmins,
    edithAdmin,
    deleteAdmin
};