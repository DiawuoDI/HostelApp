const Prisma = require('../../utils/prismaUtils');
const logger = require('../../utils/loggerUtils');
const CustomError = require('../../utils/customErrorClass');

const signup = async (req, res, next) => {
  const { email } = req.body
  const admin = await Prisma.admin.findUnique({
    where: {
        email,
    }
  })
  if (admin) {
    res.status(400).json({ message: 'Admin Already exist!'})
  } else{
    next()
  }
}

const validateEmail = async ( req, res, next ) => {
    try {
        const { email } = req.body
        const admin  = await Prisma.admin.findUnique({
            where: {
                email
            },
        })
        if(!admin) {
            throw new CustomError(404, 'Email not found!')
        } else {
            req.person ={
                id: admin.id,
                password: admin.password,
            }
            next()
        }
    } catch (error) {
       logger.error(error)
       next(error) 
    }
}

module.exports = {
    signup,
    validateEmail
}