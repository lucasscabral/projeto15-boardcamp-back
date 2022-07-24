import joi from "joi";

export const validateGames = joi.object({
    name: joi.string().required(),
    image: joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/i).required(),
    stockTotal: joi.number().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required(),
})
