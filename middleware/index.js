//all middlewares
var express         = require('express'),
    Comment         = require('../models/comments'),
    Campground      = require('../models/campgrounds'),
    middlewareObj   = {};

middlewareObj.campgroundOwnershipCheck  = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp) {
            if(err) {
                req.flash("error", err);
                res.redirect("/campgrounds")
            } else {
                if(foundCamp.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }
    else {
        req.flash("error", "You are not logged in");
        res.redirect("/login");
    }
};

middlewareObj.commentOwnershipCheck  = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("/campgrounds")
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "you cannot tamper with comments that's not yours")
                    res.redirect("back");
                }
            }
        })
    }
    else {
        req.flash("error", "Log in first, please")
        res.redirect("/login")
    }
};

middlewareObj.isLoggedIn  = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login")
};


module.exports    = middlewareObj;
