const express = require('express');
const { urlencoded } = require('express');
const app = express();
const path =require('path');

require('dotenv').config({path: path.resolve(__dirname, './.env')});
const connectDb = require('./dataBase/mongodbConnect');
const AppError = require('./utils/AppError');
const {globalErrorHandler} = require('./controllers/globalErrorHandler')

const toDoRoute = require('./routes/toDoListRoute');

app.use(express.json());
app.use(urlencoded({extended: false}));

const PORT = process.env.PORT || 8000;

// MIDDLEWARES

app.use('/todo',toDoRoute);

app.all('*', (req,res,next)=> {
    next(new AppError(`'${req.url}' does not exist`,404));
})

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler)


// FUNCTION TO START THE APP
const startApp = async () => {
    try {
        await connectDb(process.env.URI);
        console.log('Connected to DB');
        app.listen(PORT, console.log(`listening on port ${PORT}`));

    } catch (e) {
        console.log(e)
    }
}

startApp();

