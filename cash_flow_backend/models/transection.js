const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    balance: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
