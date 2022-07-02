const AppError = require('../utils/AppError')


 const handleValidationError = (error)=> {
    let errorPaths = Object.keys(error.errors);
    return new AppError(`Invalid Input data for ${errorPaths.join(',')}`,400)
}

const handleCastError = (error)=> {
    return new AppError(`Invalid ${error.path}:${error.value}`,400)
    // console.log(error)
}

const sendDevError = (err,res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({status:err.status,message:err.message,error:err,stack:err.stack})
    } else { 
        res.status(500).json({error:err});
    }
}


const sendProdError = (err,res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({status:err.status,message:err.message})
    } else { 
        res.status(500).json({status:'Error',message:'Something went wrong, try again later'})
    }
}
    
    
exports.globalErrorHandler = (err, req, res, next)=>{
        
        if(process.env.NODE_ENV === 'production') {
            let error = {message:err.message,...err}
            if(err.name === 'ValidationError') error = handleValidationError(error);
            if(err.name === 'CastError') error = handleCastError(error);
            sendProdError(error,res);
        } else if(process.env.NODE_ENV === 'development') {
            sendDevError(err,res);
        }
    
}