const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    listName:   String,
    tasks:      String,
    user:       String,
    role:       Number,
    profilePic: String
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('User', userSchema);

