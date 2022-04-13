var express     = require('express'),
    router      = express.Router(),
    Campground  = require('../models/campgrounds'),
    middleware  = require('../middleware');

//Index(GET): gets all campgrounds in db
router.get("", function(req, res){
//find all campgrounds
    Campground.find({}, function(err, allCamps){
        if(err){
            console.log(err)
        } else{
            res.render("campground/index", {campgrounds: allCamps, currentUser: req.user});
        }
    })
});

//Create(POST): adds campground to db
router.post("", middleware.isLoggedIn, function(req, res){
    //extract campground from form
    var name    = req.body.name,
        price   = req.body.price,
        image   = req.body.image,
        desc    = req.body.description,
        author  = {
            id: req.user._id,
            username: req.user.username
        },
        newCampground = {name: name, price: price, img: image, desc: desc, author: author};
    //add to the db
    Campground.create(newCampground, function(err, newCamp){
        if(err){
            req.flash("error", err.message);
            console.log(err)
        } else{
            //redirect to the campground page
            req.flash("success", "successfully added your campground");
            res.redirect("/campgrounds");
        }
    })
});


//New(GET): shows the form for creating new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campground/new");
});

//Show(GET): shows more detail about a particular campground
router.get("/:id", function(req, res){
    //find the campground with selected id
    Campground.findById(req.params.id).populate('comment').exec(function(err, foundIdCamp){
        if(err){
            req.flash("error", err.message);
            console.log(err);
        } else{
            //send to the show template
            res.render("campground/show", {campground: foundIdCamp});
        }
    });
});

//Edit(Get) route
router.get("/:id/edit", middleware.campgroundOwnershipCheck, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err) {
            req.flash("error", "something went wrong");
            res.redirect("/campgrounds");
        } else {
            res.render("campground/edit", {campground: foundCamp});
        }
    })
});
//Update(Put) route
router.put("/:id", middleware.campgroundOwnershipCheck, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp) {
        if(err) {
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Edited successfully");
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});
//Destroy(delete) route
router.delete("/:id", middleware.campgroundOwnershipCheck, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "campground deleted successfully");
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router;