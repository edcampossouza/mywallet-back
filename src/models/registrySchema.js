import Joi from "joi";

export const registryInputSchema = Joi.object({
  userId: Joi.string().required(),
  description: Joi.string().required(),
  ammount: Joi.number().positive().required(),
});

export const registrySchema = Joi.object({
  userId: Joi.string().required(),
  description: Joi.string().required(),
  ammount: Joi.number().positive(),
  //C: credit; D: debit
  type: Joi.string().valid("C", "D").required(),
});
