const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const { listingschema } = require("../schema");
const Listing = require("../models/listing");

const validateListing = (req, res, next) => {
    let { error } = listingschema.validate(req.body);
    if (error) {
        let errmsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}))

router.get("/new", wrapAsync(async (req, res) => {
    res.render("listings/new");
}))

router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { showlist });
}))

router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const listing = new Listing({ ...req.body.listing });
    await listing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
}));
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    res.render("listings/edit", { showlist });
}))
router.put("/:id", validateListing, wrapAsync(async (req, res) => {

    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}))
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

module.exports = router;