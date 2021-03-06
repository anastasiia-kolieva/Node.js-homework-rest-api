const express = require("express");
const router = express.Router();
const usersControllers = require("../../../controllers/users");
const validate = require("./validation.js");
const guard = require("../../../helpers/guard");

// Создать ендпоинт /auth/register
router.post("/auth/register", validate.register, usersControllers.registration);

// Создать ендпоинт /auth/login
router.post("/auth/login", validate.login, usersControllers.login);

// Создать ендпоинт /auth/logout
// guard нужен потому что разлогиниться может только пользователь, который залогинился
router.post("/auth/logout", guard, usersControllers.logout);

// Создать ендпоинт /current
router.get("/current", guard, usersControllers.getInfoAboutCurrentUser);

module.exports = router;
