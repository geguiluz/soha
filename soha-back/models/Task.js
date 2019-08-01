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
    assignedTo:   [[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]],
    completed:    [Boolean],
    dueDate:      String,
    startedDate:  String,
    finishedDate: String,
    coments:      String
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Task', taskSchema);





