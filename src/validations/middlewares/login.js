const Prisma = require('../../utils/prismaUtils');
const bcrypt = require('../../utils/bcryptUtils');


const login = async (req, res, next) => {
    const {email, password} = req.body;
    const admin = await Prisma.admin.findFirst({
        where:{
            email,
        },
    });
    if(admin) {
        const comparePassword = await bcrypt.compare(password, admin.password);
        if (comparePassword) {
            res.status(200).json({message: 'logged in'});
        } else {
            throw new Error(404, 'Invalid Password!');
        }
    } else {
        res.status(404).json({ message: 'admin not found, please signup'});
    }
}

module.exports = {
    login
}