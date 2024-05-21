const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;