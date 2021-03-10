const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(30),
  subscription: Joi.any().valid("free", "pro", "premium"),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  subscription: Joi.string().optional(),
  password: Joi.string().required(),
  token: Joi.any().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.register = (req, res, next) => {
  return validate(schemaRegister, req.body, next);
};

module.exports.login = (req, res, next) => {
  return validate(schemaLogin, req.body, next);
};
