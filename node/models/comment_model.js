var mongoose = require('mongoose');
var schema = mongoose.Schema;

var commentSchema = new schema({
    username: String,
    rating: Number,
    comment: String,
    active_ind: String
    
})

module.exports = mongoose.model('Comment',commentSchema);