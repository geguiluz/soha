const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Task     = require('./Task')
const User     =require('./User')

const companytSchema = new Schema({
    name:         String,
    createdBy:    User._id,
    longDesc:     String,
    participants: [User._id], 
    tasks:        [Task.name]
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('company', companytSchema);

