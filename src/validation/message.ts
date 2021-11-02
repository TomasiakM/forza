import * as Joi from "joi";
import Message from "../types/Message";

const validationSchema = Joi.object({
	title: Joi.string().min(3).max(35).required().messages({
		"string.empty": "This field is required",
		"string.required": "This field is required",
		"string.min": "Minimum 3 characters",
		"string.max": "Maximum 35 charakters",
	}),
	name: Joi.string().min(3).max(25).required().messages({
		"string.empty": "This field is required",
		"string.required": "This field is required",
		"string.min": "Minimum 3 characters",
		"string.max": "Maximum 25 charakters",
	}),
	email: Joi.string().email().required().messages({
		"string.empty": "This field is required",
		"string.email": "Email must be valid",
		"string.required": "This field is required",
	}),
	message: Joi.string().min(8).max(2000).required().messages({
		"string.empty": "This field is required",
		"string.required": "This field is required",
		"string.min": "Minimum 8 characters",
		"string.max": "Maximum 2000 charakters",
	}),
});

export default (data: Message) => {
	const { error, value } = validationSchema.validate(data, {
		abortEarly: false,
		stripUnknown: true,
	});
	if (error) {
		let err = {};
		error.details.forEach((e) => {
			err = { ...err, [e.path[0]]: e.message };
		});
		return { error: err };
	}
	return { error, value };
};
