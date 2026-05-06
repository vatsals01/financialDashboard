const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true},
    accountId: {type: String, required: true},
    accountType: {type: String, required: true},
    holderCategory: {type: String, required: true},
    balances: [
        {
            current: {type: Number},
            limit: {type: Number}
        }
    ],
    accountHolderName: {type: String, required: true}
})
const AccountModel = mongoose.model("Account",AccountSchema);
module.exports = AccountModel;