const jwt = require("jsonwebtoken");
const users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
// необходимо потому что есть секретное слово
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (_req, res, next) => {
  try {
    //  пришло от заполнения формы
    const { email } = req.body;
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

    // создание нового пользователя
    const newUser = await users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
};

const login = async (_req, res, next) => {};

const logout = async (_req, res, next) => {};

module.exports = {
  registration,
  login,
  logout,
};
