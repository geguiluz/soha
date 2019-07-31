const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./')
const Company  = require('./Company')

const taskSchema = new Schema({
    company:      Company.name,
    name:         String,
    longDesc:     String,
    createdBy:    User._id,
    assignedTo:   [User._id],
    completed:    [Number],
    dueDate:      String,
    startedDate:  String,
    finishedDate: String,
    coments:      String
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('User', taskSchema);





