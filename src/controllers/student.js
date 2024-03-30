const prisma = require('../utils/prismaUtils');
const bcrypt = require('../utils/bcrypt');
const logger = require('../utills/loggerUtils');
const cloudinary = require('../utils/cloudinary')
const customError = require('../utils/customErrorClass');
const {
    loadStudent,
    loadStudents,
    saveStudent,
    removeStudent,
    updateStudent,
} = require('../helpers/student');

exports.registerStudent = async (req, res, next) => {
    try {
        const data = req.body;
        console.log('this is data', data)
        data.level = parseInt(data.level);
        const photo = req.file ? req.file.path: undefined;
        if (photo) {
           const uploaded = await cloudinary.uploader.upload(photo, {
            folder: 'student/pictures'
           })
           if (uploaded) {
             data.profile = uploaded.secure_url;
           } 
        }
        data.password = await bcrypt.hash(data.password)
        const student = await saveStudent(data)
        res
        .status(200)
        .json({ student })
    } catch (error) {
        logger.error(error)
        next()
    }
}

exports.login = async (req, res, next) => {
    try {
        const data = req.body
        const telephone = data.telephone;
        const find_student = await prisma.student.findUnique({
            where: {
                telephone
            }
        })
        if (!find_student) {
           throw new customError(400, 'student not found') 
        } else {
           const checkPassword = await bcrypt.compare(
            data.password,
            find_student.password
           );
           if (!checkPassword) {
            throw new customError(400, 'Invalid Credentials')
           } else{
            delete find_student.password;
            return res.status(200).json({
                message: 'Succefully login',
                student: find_student
            })
           }
        }
    } catch (error) {
       logger.error(error)
       next() 
    }
}

exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await loadStudents();
        res.status(200).json({ students })
    } catch (error) {
      logger.error(error);
      next()  
    }
};

exports.getSingleStudent = async (req, res, next) => {
    try {
        const student = await loadStudent();
        res.status(200).json({ student })
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await removeStudent(id);
        res.status(200).json({ student})
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.edithStudent = async (req, res,net) => {
    try {
        const { id } = req.params;
        const data = req.body
        const student = await updateStudent(id, data)
        res.status(200).json({ student })
    } catch (error) {
        
    }
}

exports.findStudentsAllocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await prisma.student.findFirst({
            where: {
                studentId: id,
            },
            include: {
                department: true,
                hostel: {
                    include: {
                        rooms: true
                    }
                }
            }
        })
        res.status(200).json({ student })
    } catch (error) {
       logger.error(error)
       next() 
    }
}