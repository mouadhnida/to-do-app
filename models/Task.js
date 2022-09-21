const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'max name can not be more than 20']
    }, 
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('Task', taskSchema)