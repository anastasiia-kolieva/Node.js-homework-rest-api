const express = require("express");
const router = express.Router();
const usersControllers = require("../../../controllers/users");
const validate = require("./validation.js");

router
// Создать ендпоинт /auth/register
.post("/auth/register")

// Создать ендпоинт /auth/login
.post("/auth/login")

// Создать ендпоинт /auth/logout
.post("/auth/logout");

module.exports = router;
