const joi = require("joi");
module.exports.listingschema = joi.object(
    {
        listing: joi.object({
             title:joi.string().required(),
             description:joi.string().required(),
             price:joi.number().min(0).required(),
             url:joi.string().allow("",null),
             location:joi.string().required(),
             country:joi.string().required(),
             filename:joi.string().allow(null)

        })
    })