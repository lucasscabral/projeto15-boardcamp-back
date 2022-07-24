import joi from "joi"


export const validateCustomers = joi.object({
        name: joi.string().required(),
        phone: joi.string().pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/).required(),
        cpf: joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
        birthday: joi.string().required() 
})