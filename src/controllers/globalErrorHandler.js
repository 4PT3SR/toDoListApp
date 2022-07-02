const AppError = require('../utils/AppError')

// hANDLE VALIDATION ERROR COMING FROM MONGOOSE
 const handleValidationError = (error)=> {
    let errorPaths = Object.keys(error.errors);
    return new AppError(`Invalid Input data for ${errorPaths.join(',')}`,400)
}

// HANDLE CAST ERROR COMING FROM MONGOOSE E.G(INVALID ID)
const handleCastError = (error)=> {
    return new AppError(`Invalid ${error.path}:${error.value}`,400)
}

// TO SHOW ERROR DETAILS IN DEVELOPMENT MODE
const sendDevError = (err,res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({status:err.status,message:err.message,error:err,stack:err.stack})
    } else { 
        res.status(500).json({error:err});
    }
}

// SEND THIS ERROR BACK TO USER IN PRODUCTION ENV
const sendProdError = (err,res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({status:err.status,message:err.message})
    } else { 
        res.status(500).json({status:'Error',message:'Something went wrong, try again later'})
    }
}
    
    
exports.globalErrorHandler = (err, req, res, next)=>{
        
        if(process.env.NODE_ENV === 'production') {
            let error = {message:err.message,...err} /*TRYING NOT TO MUTATE THE ERR OBJECT ITSELF */
            if(err.name === 'ValidationError') error = handleValidationError(error);
            if(err.name === 'CastError') error = handleCastError(error);
            sendProdError(error,res);
        } else if(process.env.NODE_ENV === 'development') {
            sendDevError(err,res);
        }
    
}