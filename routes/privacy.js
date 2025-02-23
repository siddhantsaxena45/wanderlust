const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const privacyController = require("../controllers/privacy");


router.route("/")
    .get(wrapAsync(privacyController.index))