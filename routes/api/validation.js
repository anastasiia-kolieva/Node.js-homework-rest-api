const Joi = require("joi");
// joi-objectid
Joi.objectId = require("joi-objectid")(Joi);

// схема на создание контака
const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
  password: Joi.string().required(),
});

// схема для обновления контака
// .optional() любой из трёх может прийти
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .optional(),
  password: Joi.string(),
}).min(1);

// схема валидации id
// const schemaValidationIdOfContact = Joi.object({
//   contactId: Joi.string().length(24).alphanum().required(),
// });

// валидация с применением joi-objectid
const schemaValidationIdOfContact = Joi.object({
  contactId: Joi.objectId(),
});

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

// миделвар
module.exports.validationIdOfContact = (req, res, next) => {
  return validate(schemaValidationIdOfContact, req.params, next);
};
