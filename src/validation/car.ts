import Car from "../types/Car"
import * as Joi from 'joi'

const messages = {
    'number.required': 'This field is required',
    'string.required': 'This field is required',
    'any.required': 'This field is required',
    'string.empty': 'This field is required',
    'number.base': 'This field is required',
 }

const statistic = Joi.number().$.min(0).max(10).rule({ message: 'Number must be between 0 and 10' })
    .precision(1).required().messages({...messages})
const string = Joi.string().$.min(3).max(255).rule({ message: "Field length must be between 3 and 255"}).required().messages({...messages})
const image = Joi.string().regex(/(https?:\/\/.*\.(?:png|jpg|jpeg))/).required().messages({...messages, 'string.pattern.base': "This is not valid link"})


const validationSchema = Joi.object({
    speed: statistic,
    handling: statistic,
    acceleration: statistic,
    launch: statistic,
    breaking: statistic,
    carClass: Joi.number().$.min(100).max(999).rule({ message: "Number must be between 100 and 999"}).required().messages({ ...messages }),

    engine: string,
    enginePosition: string,
    power: string,
    drive: string,
    transmission: string,
    weight: string,

    make: string,
    model: string,
    productionYear: Joi.number().$.min(1900).max(new Date().getFullYear())
        .rule({ message: `Year must be between 1900 and ${new Date().getFullYear()}` }).required().messages({...messages, }),
    price: Joi.number().required().messages({...messages}),
    description: Joi.string().$.min(3).max(4096).rule({ message: "Field length must be between 3 and 4096"}).required().messages({...messages}),
    thumbnail: image,
    driveImage: image,
    images: Joi.array().min(2).items(Joi.object({ url: image.messages({ ...messages, "string.pattern.base": "At least 1 link is not valid" }), id: Joi.number() })).messages({ 'array.min': "Minimum 2 images", "array.includesRequiredUnknowns": "At least 1 link is not valid"})
})


export default (data: Car) =>  {
    const { error, value } = validationSchema.validate(data,{abortEarly: false, stripUnknown: true });
    if(error){
        let err = {}
        error.details.forEach(e => {
            err = { ...err, [e.path[0]]: e.message }
        })
        return { error: err }
    }
    return { error, value }
}
