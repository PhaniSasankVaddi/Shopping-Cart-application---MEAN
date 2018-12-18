var mongoose = require('mongoose');
var schema = mongoose.Schema;

var favouriteSchema = new schema({
    userId: String,
    fruitName: String,
    availability: Number,
    tax: Number,
    price: Number,
})


module.exports = mongoose.model('Favourites',favouriteSchema);