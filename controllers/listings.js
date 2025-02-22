const Listing = require('../models/listing');
const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.MAP_API_KEY, 
});

module.exports.index = async (req, res) => {
    const { category, search } = req.query; // Get category & search query
    let filter = {};

    // Apply category filter if selected
    if (category && category !== "All") {
        filter.category = category;
    }

    // Apply search filter if search query exists
    if (search) {
        filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index", { allListings, selectedCategory: category || "All" });
};

module.exports.newListing = async (req, res) => {
    res.render("listings/new");
}
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!showlist) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { showlist });
}

module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        const { location } = req.body.listing;

        // Geocode the address
        const geoData = await geocoder.geocode(location);
        if (!geoData.length) {
            req.flash("error", "Invalid address. Please enter a valid location.");
            return res.redirect("/listings/new");
        }

        // Extract latitude and longitude (GeoJSON format requires [lng, lat])
        const { latitude, longitude } = geoData[0];

        // Create listing with GeoJSON location
        const listing = new Listing({
            ...req.body.listing,
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude], // GeoJSON expects [lng, lat]
            },
            image: { url, filename },
            owner: req.user._id
        });

        await listing.save();
        req.flash("success", "New listing created!");
        res.redirect("/listings");

    } catch (error) {
        console.error("Error creating listing with Geocoding:", error);
        req.flash("error", "Failed to create listing. Try again.");
        res.redirect("/listings/new");
    }
};
module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    if (!showlist) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    let originalimageurl=showlist.image.url;
    originalimageurl=originalimageurl.replace("upload","upload/w_300,h_200");
    res.render("listings/edit", { showlist ,originalimageurl});
}
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { location } = req.body.listing; // Get updated location

    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing does not exist!");
            return res.redirect("/listings");
        }

        // If location is updated, re-geocode to get new coordinates
        if (location && location !== listing.location) {
            const geoData = await geocoder.geocode(location);
            if (!geoData.length) {
                req.flash("error", "Invalid address. Please enter a valid location.");
                return res.redirect(`/listings/${id}/edit`);
            }
            const { latitude, longitude } = geoData[0];
            listing.geometry = {
                type: "Point",
                coordinates: [longitude, latitude], // GeoJSON format
            };
        }

        // Update other listing details
        Object.assign(listing, req.body.listing);

        // If a new image is uploaded, update it
        if (typeof req.file !== "undefined") {
            listing.image = { url: req.file.path, filename: req.file.filename };
        }

        await listing.save();
        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error("Error updating listing:", error);
        req.flash("error", "Failed to update listing. Try again.");
        res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}