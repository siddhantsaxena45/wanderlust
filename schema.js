const Joi = require("joi");

module.exports.listingschema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            filename: Joi.string().allow(null, ""),
            url: Joi.string().allow(null, ""),
        }).optional(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});
