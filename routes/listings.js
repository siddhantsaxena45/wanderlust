const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isloggedin, isOwner,validateListing}=require("../middleware");


router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}))

router.get("/new", isloggedin,wrapAsync(async (req, res) => {
    res.render("listings/new");
}))

router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id).populate("reviews").populate("owner");
    if (!showlist){
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");}
    res.render("listings/show.ejs", { showlist });
}))

router.post("/",isloggedin, validateListing, wrapAsync(async (req, res, next) => {
    const listing = new Listing({ ...req.body.listing });
    listing.owner = req.user._id;
    await listing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}));

router.get("/:id/edit",isloggedin,isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    if (!showlist){
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit", { showlist });
}));

router.put("/:id",isloggedin, isOwner,validateListing, wrapAsync(async (req, res) => {

    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

router.delete("/:id",isloggedin,isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}));

module.exports = router;