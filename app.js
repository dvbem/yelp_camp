var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    //Campground    = require('./models/campgrounds'),
    //Comment       = require('./models/comments'),
    methodOverride  = require('method-override'),
    User            = require('./models/users'),
    session         = require('express-session'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    flash           = require('connect-flash');
    //seedDb          = require('./seeds');

var campgroundsRoutes   = require('./routes/campgrounds'),    
    commentRoutes       = require('./routes/comments'),
    authRoutes          = require('./routes/index');


//seedDb();
//mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true}, {useUnifiedTopology: true});
//mongoose.connect("mongodb+srv://Dvbem:<17071997chidubem>@yelpcamp.mjt51.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
var url ='mongodb+srv://Dvbem:1707@yelpcamp.mjt51.mongodb.net/yelpcamp?retryWrites=true&w=majority';
var connectionParams = {
    useNewUrlParser: true,
    useCreateIndex:  true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('connected to the database')
    })
    .catch( (err) => {
        console.log(err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.set("view engine", "ejs");
//app.use('/img', express.static(__dirname + '/img'));

//PASSPORT CONFIG
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});
app.use(methodOverride("_method"));
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);
app.listen(process.env.PORT || 3000, function(){
    console.log('express server listening')
});

//app.listen(3000, function(){
    //console.log("Running the yelpcamp app!");
//});