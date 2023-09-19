import Joi from 'joi';

export const valid = Joi.object( {
    climate: Joi.string().required().valid(...["hot", "cold", "humid", "rainy"]),
    area_code: Joi.number().min( 100 ).max( 1000 ).required(),
    humidity: Joi.number().required(),
    temperature: Joi.number().required(),
    chances_of_rain:Joi.number().required()
})