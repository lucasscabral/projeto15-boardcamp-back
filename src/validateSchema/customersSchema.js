import joi from "joi"
 
const date = Date.now();
const dataMinima = new Date(date - (100 * 60 * 60 * 24 * 365 * 18));

export const validateCustomers = joi.object({
        name: joi.string().required(),
        phone: joi.string().pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/).required(),
        cpf: joi.string().pattern(/^\d{3}\d{3}\d{3}\d{2}$/).required(),
        birthday: joi.date().max(dataMinima).required()
})