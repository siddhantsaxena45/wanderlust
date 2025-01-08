const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongo_url);
}
main().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
});

async function initdb() {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}
initdb();