var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/users'),
    passport    = require('passport');

router.get('/', function(req, res){
    res.render('landing')
});

//___________________
//Auth Routes
//___________________

//Display the Register form
router.get('/register', function(req, res) {
    res.render('register')
});
//Receive the register details
router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        {passport.authenticate('local')(req, res, function() {
            req.flash("success", user.username + ' welcome onboard');
            res.redirect('/campgrounds');
        })}
    })
});

//________________________
//Login routes
//________________________
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

//Logout routes
router.get('/logout', function(req, res) {
    req.logout()
    req.flash("success", "You have just been logged out");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports   = router;