const { Router } = require('express');

const mainRouter = Router();
const indexRouter = require('./v1/index');

mainRouter.use('/v1', indexRouter);
module.exports = mainRouter;