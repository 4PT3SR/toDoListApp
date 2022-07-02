const mongoose = require('mongoose');

function connectDb(URI) {
  
    return mongoose.connect(URI);
  
}


module.exports = connectDb;