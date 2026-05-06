const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true},
    transactionType: {type: String, required: true},
    currentBalance: {type: Number},
    updatedBalance: {type: Number}
});
const TransactionModel = new mongoose.model("Transaction",TransactionSchema);
module.exports = TransactionModel;