
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { reviewschema } = require("../schema");
const {isloggedin}=require("../middleware");
const validateReview = (req, res, next) => {
    let { error } = reviewschema.validate(req.body);
    if (error) {
        let errmsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

router.post("/",isloggedin, validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newreview = new Review(req.body.review);
    newreview.username = req.user.username;
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    console.log("new data saved");
    req.flash("success", "New review added!");
    res.redirect(`/listings/${listing._id}`);

}));
router.delete("/:reviewid",isloggedin, wrapAsync(async (req, res) => {
    const { id, reviewid } = req.params;
    const review = await Review.findById(reviewid);
    if (!review.user.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
}))
module.exports = router;
