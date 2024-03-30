const bcrypt = require('../utils/bcryptUtils')
const logger = require('../utils/loggerUtils');
const { signToken, setInvalidToken } = require('../utils/tokenUtil');
const {
    addAdmin,
    getAdmin,
    getAdmins,
    edithAdmin,
    deleteAdmin,
} = require('../helpers/admin');

exports.signUp = async (req, res, next) =>{
    try {
        const data = req.body
        data.password = await bcrypt.hash(data.password);
        console.log(data.password);
        const admin = await addAdmin(data);
        const token = signToken({ id: admin.id});
        delete admin.password;
        res
        .status(200)
        .json({ message: 'admin Registered', admin, acessToken: token})
    } catch (error) {
        logger.error(error);
        next();
    }
} 

exports.login = async (req, res, next) => {
    try {
        const { password } = req.body;
        const systemPassword = req.person.password;
        const checkPassword = await bcrypt.compare(password, systemPassword);
        if (!checkPassword) {
            throw new Error('Invalid Credentials')
        }else {
            delete admin.password;
            res
            .status(200)
            .json({message: 'User succesfully logged in', id: req.parson.id})
        }
    } catch (error) {
      logger.error(error)
      next();  
    }
}

exports.logout = async (req, res, next) => {
    try {
        const loggedout = 'loggedout';
        const token = setInvalidToken({ loggedout});
        res
        .status(200)
        .json({ message: 'Logged out Succesfully', token})
    } catch (error) {
       logger.error(error)
       next() 
    }
}

exports.loadAdmins = async (req,res, next) => {
    try {
        const admin = await getAdmins();
        res
        .status(200)
        .json({ status: 'Successfull', admin});
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.loadAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admin = await getAdmin(id);
        res
        .status(200)
        .json({ admin }) 
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.updateAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const admin = await edithAdmin(id, data);
        res
        .status(200)
        .json({ admin })
    } catch (error) {
      logger.error(error)
      next()  
    }
}

exports.removeAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admin = await deleteAdmin(id);
        res
        .status(200)
        .json({ admin })
    } catch (error) {
       logger.error(error)
       next() 
    }
}