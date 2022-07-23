import joi from "joi"

export const validateCategories = joi.object({
    name: joi.string().required()
})