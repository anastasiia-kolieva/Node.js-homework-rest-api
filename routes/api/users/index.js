const express = require("express");
const router = express.Router();
const usersControllers = require("../../../controllers/users");
const validate = require("./validation.js");

// Создать ендпоинт /auth/register
router.post("/auth/register", usersControllers.registration);

// Создать ендпоинт /auth/login
router.post("/auth/login", usersControllers.login);

// Создать ендпоинт /auth/logout
router.post("/auth/logout", usersControllers.logout);

module.exports = router;
