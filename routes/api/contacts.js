const express = require("express");
const router = express.Router();
const contacts = require("../../model/index.js");
const { query, validationResult } = require("express-validator");

// миделвар
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  // пробрасываем управление на след.функцию
  next();
};

router.get("/", async (req, res, next) => {
  try {
    // В responce массив обектов контактов распарсенный
    const responce = await contacts.listContacts();
    return res.json(responce);
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
});

router.get("/:contactId", 
// валидация с помощью express-validator
// приходит ли число в contactId
// [query('contactId').isNumeric()],
// validator,
async (req, res, next) => {
 
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", 
// валидация с помощью express-validator
// приходит ли число в contactId
// [query('contactId').isNumeric()],
// validator,
async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", 
// валидация с помощью express-validator
// приходит ли число в contactId
// [query('contactId').isNumeric()],
// validator,
async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
