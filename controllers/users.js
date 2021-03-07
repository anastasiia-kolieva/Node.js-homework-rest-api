const jwt = require("jsonwebtoken");
const users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
// необходимо потому что есть секретное слово
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (_req, res, next) => {
  try {
    //  пришло от заполнения формы
    const { name, email, password, subscription } = req.body;
    // перед тем как регестрировать пользователя, его нужно найти (юзера)
    const user = await users.findByEmail(email);
    // если пользователь есть (конфликт имен)
    // Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
    if (user) {
      // сообщаем о конфликте
      return req.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email in use",
      });
    }

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
};

module.exports = {
  registration,
};
