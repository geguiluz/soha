const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const missionTagSchema = new Schema({
    missionName:  String,
    company:      String,
    displayColor: String,
    createdBy:    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('MissionTags', missionTagSchema);





