const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Task     = require('./Task')
const User     = require('./User')

const companytSchema = new Schema({
    name:         String,
    createdBy:    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    longDesc:     String,
    participants: [[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]], 
    tasks:        [String]
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('company', companytSchema);

