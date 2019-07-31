const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./User')
const Company  = require('./Company')

const taskSchema = new Schema({
    company:      String,
    name:         String,
    longDesc:     String,
    createdBy:    String,
    assignedTo:   [String],
    completed:    [Number],
    dueDate:      String,
    startedDate:  String,
    finishedDate: String,
    coments:      String
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Task', taskSchema);





