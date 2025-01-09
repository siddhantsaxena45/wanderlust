const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require('method-override');
const ejsmate = require("ejs-mate");

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
app.get("/", (req, res) => {
    res.redirect("listings");
})

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
})

app.get("/listings/new", (req, res) => {
    res.render("listings/new");
})

app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    res.render("listings/show.ejs", { showlist });
})

app.post("/listings", warapAsync(async (req, res, next) => {
    
        console.log(req.body.Listing);
        const listing = new Listing(req.body.Listing);
        await listing.save();
        res.redirect("/listings");
   
}));
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const showlist = await Listing.findById(id);
    res.render("listings/edit", { showlist });
})
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.use((err, req, res, next) => {
    res.send("something went wrong");
})
// app.get("/testsample",async (req,res)=>{
//     const list = new Listing({
//         title: "Modern Loft in Downtown",
//         description:
//           "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
//         image: 
//            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         price: 1200,
//         location: "New York City",
//         country: "United States",
//     })
//     await list.save();
//     console.log("data saved");
//     res.send("document saved");
// })

const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})