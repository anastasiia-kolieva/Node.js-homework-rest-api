const Joi = require("joi");

// схема на создание контака
const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
});

// схема для обновления контака
// .optional() любой из трёх может прийти
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .optional(),
}).min(1);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

// миделвар
module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

// миделвар
module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};