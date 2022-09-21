const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {  createCustomError } = require('../error/custom-error');


const getAllTasks = asyncWrapper(async (req, res) => {
        const Tasks = await Task.find({})
        res.status(200).json({Tasks})    
});

const createTask = asyncWrapper(async (req, res) => {
        const createTask = await Task.create(req.body)
        res.status(201 ).json({
            createTask})
});

const updateTask = asyncWrapper(async (req, res, next) => {
        const { id: taskID } = req.params
        const task  = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })  
        if(!task) {
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }res.status(200).json({ task }) 
    
});

const deleteTask = asyncWrapper(async (req, res, next) => {
        const { id } = req.params;
        const task  = await Task.findOneAndDelete({ _id: id })  
        if(!task) {
            return next(createCustomError(`No task with id: ${id}`,404))
        }res.status(200).json({msg : `Task with id: ${id} is deleted`})
});

const getTask = asyncWrapper(async (req, res, next) => {
        const { id } = req.params;
        const task  = await Task.findOne({ _id: id })  
        
        if(!task) {
            return next(createCustomError(`No task with id: ${id}`,404))
        }res.status(200).json({task}) 
});

module.exports = { 
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};