const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/reviews");
const listingRouter = require("./routes/listings");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongo_url);
}
main().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
})
app.engine('ejs', ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.get("/", wrapAsync(async (req, res) => {
    res.redirect("listings");
}))

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.use("/",userRouter );
app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
})
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    let { statusCode = 500, message = "something went wrong" } = err;
    console.log(err);
    res.status(statusCode).render("error.ejs", { message });
})

const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})