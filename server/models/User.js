const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    refreshVersion: {type: Number, default:0}
});
const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;