const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:   String,
    email:      String,
    password:   String,
    role:       Number,
    profilePic: String,
    
    taskAssig: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('User', userSchema);


