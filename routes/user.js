
const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password);
        req.flash("success", "Signed Up successfully");
        console.log(registeredUser);
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})
router.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    req.flash("success", "Welcome back to wanderlust!");
    res.redirect("/listings");
})
router.get("/logout", (req, res, next) => {
    req.logout((error) => {
        if (error) {
            console.log(error);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    })
});
module.exports = router;