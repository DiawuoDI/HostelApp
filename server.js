// Importing express package & other middleware
const express = require('express')

const app = express(); // involking express to the variable app to speed up out server
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const PORT = process.env.PORT||2020
const { run } = ('./src/utils/setuputils');

const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const bodyparser = require('body-parser');
const indexRoute = require('./src/routes/index');

app.use(cors({origin: true, credentials: true}));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

//middleware for body parser
app.use(bodyparser.json())
//run admin
run()
app.use('/api', indexRoute);

//an error handler to handle the middleware
app.get('test-error', (req, res) => {
    console.log(req.baseUrl)
    throw new Error('there is an error');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status:err.status || 500,
        error: err.message,
    })
})

app.listen(PORT, () => {
    console.log('server iss runing on port', `${PORT}`)
})