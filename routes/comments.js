var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Campground  = require('../models/campgrounds'),
    Comment     = require('../models/comments'),
    middleware  = require('../middleware')

//--------------------------------------------------------------------
//COMMENT ROUTES
//--------------------------------------------------------------------
//New route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //get id
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: foundCamp});
        }
    })
});

//Create route
router.post("/", middleware.isLoggedIn, function(req, res) {
    //extract the campground with the new comment
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            //create comment with the form input
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err)
                } else {
                    //add comment to campground
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCamp.comment.push(comment);
                    foundCamp.save();
                    //redirect to the show page
                    req.flash("success", "thanks for the comment");
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            })
        }
    })
})

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.commentOwnershipCheck, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id})
        }
    })
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.commentOwnershipCheck, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back")
        } else {
            req.flash("success", "you just changed how you felt about this campground")
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.commentOwnershipCheck, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back")
        } else {
            req.flash("success", "oops! you took back your words")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

module.exports = router;