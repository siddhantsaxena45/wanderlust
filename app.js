const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require('method-override');
const ejsmate = require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync")


const {listingschema}=require("./schema")
const ExpressError = require("./utils/expressError");
 
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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const validateListing = (req, res, next) => {
    console.log("Incoming request body:", req.body);
    let { error } = listingschema.validate(req.body);
    if (error) {
        let errmsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

app.get("/", (req, res) => {
    res.redirect("listings");
})

app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}))

app.get("/listings/new",wrapAsync( (req, res) => {
    res.render("listings/new");
}))

app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    res.render("listings/show.ejs", { showlist });
}))

app.post("/listings",validateListing, wrapAsync(async (req, res, next) => {
        const listing = new Listing({ ...req.body.listing });
        await listing.save();
        res.redirect("/listings");   
}));
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    res.render("listings/edit", { showlist });
}))
app.put("/listings/:id",validateListing,wrapAsync( async (req, res) => {
    
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}))
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
})
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    let{statusCode=500,message="Something went wrong"}=err;
    console.log(err);
    res.status(statusCode).send(message);

})

const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})