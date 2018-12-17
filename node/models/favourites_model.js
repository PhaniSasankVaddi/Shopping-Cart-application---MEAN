var mongoose = require('mongoose');
var schema = mongoose.Schema;

var favouriteSchema = new schema({
    userId: Number,
    items: Array,
    visibility: String,
    active_ind: String
})


module.exports = mongoose.model('Favourites',favouriteSchema);