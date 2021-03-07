const jwt = require("jsonwebtoken");
const users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
// необходимо потому что есть секретное слово
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (_req, res, next) => {
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
};

module.exports = {
    registration
  };