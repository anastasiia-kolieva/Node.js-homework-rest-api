const express = require("express");
const router = express.Router();
const usersControllers = require("../../../controllers/users");
const validate = require("./validation.js");

router
  // Создать ендпоинт /auth/register
  .post("/auth/register", usersControllers.registration)

  // Создать ендпоинт /auth/login
  .post("/auth/login", usersControllers.login)

  // Создать ендпоинт /auth/logout
  .post("/auth/logout", usersControllers.logout);

module.exports = router;
