const Todo = require('../models/toDoList')
const AppError = require('../utils/AppError');

exports.addTodo = async (req,res,next) => {
    try {
        const {title,description} = req.body

        const toDo = await Todo.create({title,description})


        res.status(201).json({status:'Success',message:'Todo Created',toDo});

    } catch(e) {
        next(e);
    }
}

exports.update = async (req,res,next) => {
    try {
        const toDo = await Todo.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true,select:'-__v'});
        if(!toDo) {
            throw new AppError('No todo exists with that Id',400);
        }
        res.status(200).json({status:'Success',message:toDo});
    } catch(e) {
        next(e);
    }
}

exports.delete = async (req,res,next) => {
    try {
        const toDo = await Todo.findByIdAndDelete(req.params.id);
        if(!toDo) {
            throw new AppError('No todo exists with that Id',400);
        }
        res.status(200).json({status:'Success',message:`Deleted ${toDo.title} Successfully`})
    } catch(e) {
        next(e);
    }
}

exports.allToDos = async (req,res,next) => {
    try {
        const allToDos = await Todo.find({}).select('-__v');
        if(allToDos.length === 0) {
            return res.status(200).json({status:'Success',message:'There are no todos at the moment, add a todo'});
        }

        res.status(200).json({status:'Success',todolist:allToDos})

    } catch(e) {
        next(e);
    }
}