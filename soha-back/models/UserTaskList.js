const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    listName:   String,
    listItems: [ {type: Schema.Types.ObjectId, ref: "Task"} ],
    user:       String,

},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('listSchema', listSchema);

