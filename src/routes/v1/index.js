const { Router } = require('express')

const mainRouter = Router()
const webRoutes = require('./web')
const mobileRoutes = require('./mobile')

mainRouter.use('/web', webRoutes);
mainRouter.use('/mobile', mobileRoutes);

module.exports = mainRouter