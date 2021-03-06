const express = require("express");
// логгер запросов
const logger = require("morgan");
const cors = require("cors");

// подключение Роутера Contacts
const contactsRouter = require("./routes/api/contacts/index");
// подключение Роутера Users
const usersRouter = require("./routes/api/users/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// запуск логгера
app.use(logger(formatsLogger));
// включён cors (кросcдоменные запросы)
app.use(cors());
app.use(express.json());

// если придёт сюда на /api/contacts(по ТЗ), то иди в contactsRouter
// всё что будет начинаться /api/contacts и после /api/contacts будет описано в файле contactsRouter
app.use("/api/contacts", contactsRouter);
// всё что будет начинаться /api/users и после /api/users будет описано в файле usersRouter
app.use("/api/users", usersRouter);

// Обработчик нелегетимного ввода параметра строки маршрута
// req не используются, потому нижнее подчёркивание
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Обработчик ошибок
// req и next не используются, потому нижнее подчёркивание
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;

// запуск сервера выноситься отдельно, потому что подключение баз данных хорошо сделать в запуске сервера
// (если базу данных не получилось инициализировать, тогда мы не стартуем),
// а так же с учётом будущего импорта приложения для тестирование(там будет свой сервер)
