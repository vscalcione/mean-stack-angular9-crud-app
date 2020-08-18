const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    itemName: String,
    itemPrice: Number,
    itemQuantity: Number,
    totalPrice: String,
    updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sales', SalesSchema);
