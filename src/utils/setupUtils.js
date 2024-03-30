const prisma = require('./prismaUtils');

const data = {
    fullname: 'SuperAdmin',
    email: 'superadmin1@gmail.com',
    password: 'Admin@123',
    telephone: '0200956462'
};

exports.run = async () => {
    try {
        console.log('Checking for super admin');
        const findUsers = await prisma.admin.findMany({});
        if (findUsers.length == 0) {
            const admin = await prisma.admin.create({
                data,
            });
            console.log('SuperAdmin Created:', admin);
        }
    } catch (error) {
      console.error(error);  
    }
};