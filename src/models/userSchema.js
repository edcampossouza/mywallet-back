import Joi from "joi";

export const userInputSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().min(3).required(),
});

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: true } }),
  passwordHash: Joi.string().required(),
});
