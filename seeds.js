//seeds file
var mongoose   = require('mongoose');
    Campground = require('./models/campgrounds');
    Comment    = require('./models/comments');

var data = [
    { 
        name: "Forest Camp", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYoOY-nFGQl8rct0LXOOtLv_6GHd9Vcw9HZQ&usqp=CAU",
        desc: "Want a feel of Tarzan? this adventurous camp located in the woods, will give you a cozy feel while you enjoy our well trained harmless wildlife. This camp is also adorned with fruit growing tress, that will ensure you enjoy your jungle life with noo need for a mall"
    },
    {
        name: "Mountain Camp", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR254dBA1ZBmgenrn3aNtLZ7W6p-xsPyx0Eg&usqp=CAU",
        desc: "Want to know how it feels to be ontop of the world? the mountain camp located at the very peak of kilimanjaro, will ensure you watch over the continent from your comfort zone, with no need for satelites and cctv cameras. This camp will help you know what it feels like to get to the very top; it's not always easy though, but it's always worth it."
    },
    {
        name: "Icy Camp", 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjm67YsfFFe1LhYQ-1LHDBrf2SebuEx4l2dA&usqp=CAU",
        desc: "Cool and adventurous place to be. Located at the north pole, the Icy campground was made on purpose to meet the needs of those tired of summer, and wants to preserve thier joy in the fridge."
    }
]

function seedDb() {
    //Emptying campgrounds in db
    Campground.deleteMany({}, function(err) {
    if(err){
        console.log(err)
    }
    else {
        console.log('Removed all campgrounds')
    }       
});
};

module.exports = seedDb;