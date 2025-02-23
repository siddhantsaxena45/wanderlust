const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    try {
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

async function initdb() {
    try {
        await Listing.deleteMany({});
        console.log("Existing data cleared");
        
        const updatedData = initData.map((obj) => ({
            ...obj,
            owner: "67946b2036ee22ad5357abb5"
        }));
        
        await Listing.insertMany(updatedData);
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        mongoose.connection.close();
        console.log("Database connection closed");
    }
}

main().then(initdb);
