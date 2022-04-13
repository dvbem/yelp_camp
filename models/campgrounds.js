//Schema setup
var mongoose = require('mongoose'),
    comment  = require('./comments');

var campgroundSchema = mongoose.Schema({
    name: String,
    price: String,
    img: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'    
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);