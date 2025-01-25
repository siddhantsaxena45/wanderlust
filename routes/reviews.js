
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview } = require("../middleware");


router.post("/", validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newreview = new Review(req.body.review);  
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    console.log("new data saved");
    req.flash("success", "New review added!");
    res.redirect(`/listings/${listing._id}`);

}));


router.delete("/:reviewid", wrapAsync(async (req, res) => {
    const { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
}))

module.exports = router;
