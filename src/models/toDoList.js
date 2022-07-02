const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true,'Please fill in a title']
        },
        description: {
            type: String,
            required:[true,'Please fill in a description']
        }
    },{timestamps: true}
);


const ToDo = mongoose.model('ToDoList',toDoSchema);


module.exports = ToDo;