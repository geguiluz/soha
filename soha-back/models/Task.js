const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
    company:      String,
    name:         String,
    longDesc:     String,
    createdBy:    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo:   [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    completed:    Boolean,
    dueDate:      Date,
    startedDate:  Date,
    finishedDate: Date,
    comments:     String,
    missionTags:   [{
        type: Schema.Types.ObjectId,
        ref: 'MissionTags'
    }],
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Task', taskSchema);





