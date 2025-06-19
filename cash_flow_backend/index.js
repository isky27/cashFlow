const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/transection');

const app = express();
const PORT = 8000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB (local)
mongoose.connect('mongodb://127.0.0.1:27017/cash_flow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Get all transactions
app.get('/transections', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Add a transaction
app.post('/transections', async (req, res) => {

    try {
        const { type, amount, description } = req.body;

        if (!type || !amount || !description) {
            return res.status(400).json({ message: 'Type and amount are required.' });
        }

        const lastTransaction = await Transaction.findOne().sort({ date: -1 });

        let lastBalance = Number(lastTransaction?.balance) || 0;
        let newBalance = type === 'credit'
            ? lastBalance + (Number(amount))
            : lastBalance - (Number(amount));

        const transaction = new Transaction({
            type,
            amount,
            description,
            balance: newBalance,
        });

        const saved = await transaction.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
