var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fruitSchema = new schema({
    fruitName: {type: String, required:[true,'Fruit Name is required']},
    alt_name: String,
    price: {type: Number, required:[true,'Price is mandatory']},
    availability: {type: Number, required:[true,'Availability is mandatory']},
    tax: {type: Number, required:[true,'Tax is mandatory']}
})

module.exports = mongoose.model('Fruit',fruitSchema);