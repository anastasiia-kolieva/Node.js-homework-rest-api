const express = require("express");
const router = express.Router();
const contacts = require("../../model/index.js");

router.get("/", async (_req, res, next) => {
  try {
    // В responce массив обектов контактов распарсенный
    const responce = await contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        responce,
      },
    });
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    // В req.params будет свойство contactId
    const contact  = await contacts.getContactById(req.params.contactId);
    // если искомый контакт есть(пришёл из getContactById)
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
      // если искомый контакт НЕ пришёл из getContactById
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        "message": "Not found",
      });
    }
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
});

// создание контакта
router.post("/", async (req, res, next) => {
  try {
    // req.body это представление отсылаемого/создаваемого обьекта
    // передаем req.body в addContact
    const newContact = await contacts.addContact(req.body);
    // res.status(201) обязательно
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

// сюда приходит json или какие-то параметры
router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

// сюда приходит json или какие-то параметры
router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
