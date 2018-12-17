var mongoose = require('mongoose');
var schema = mongoose.Schema;

var cartSchema = new schema({
    userId: Number,
    items: Array,
    quantity: Number,
    price: Number,
    total: Number
})


module.exports = mongoose.model('Cart',cartSchema);