import Joi from "joi";

export const registryInputSchema = Joi.object({
  email: Joi.string().required(),
  description: Joi.string().required(),
  ammount: Joi.number().positive(),
});

export const registrySchema = Joi.object({
  email: Joi.string().required(),
  description: Joi.string().required(),
  ammount: Joi.number().positive(),
  //C: credit; D: debit
  type: Joi.string().valid("C", "D").required(),
});
