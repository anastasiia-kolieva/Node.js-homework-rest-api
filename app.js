const express = require("express");
// helmet для защиты приложения от перегрузки сервера
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// логгер запросов
const logger = require("morgan");
const cors = require("cors");

// подключение Роутера Contacts
const contactsRouter = require("./routes/api/contacts/index");
// подключение Роутера Users
const usersRouter = require("./routes/api/users/index");

const { HttpCode } = require("./helpers/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// запуск helmet
app.use(helmet());
// запуск логгера
app.use(logger(formatsLogger));
// включён cors (кросcдоменные запросы)
app.use(cors());
// чтоб урать ещё одну возможность положить приложение нужно установить limit в байтах
// не разрешено присылать обьем информации более 10 000 байта
// чтоб не спамили большой информацией
app.use(express.json({ limit: 10000 }));

const apiLimiter = rateLimit({
  // если в течении 15 минут, сделаются больше чем 100 запросов, тогда нас просто откинет
  windowMs: 15 * 60 * 1000,
  max: 100,
  headers: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Forbidden",
      message: "Too many requests, please try again later",
    });
  },
});
app.use("/api/", apiLimiter);

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
