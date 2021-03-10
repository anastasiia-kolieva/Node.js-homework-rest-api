const jwt = require("jsonwebtoken");
const users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
// необходимо потому что есть секретное слово
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const registration = async (req, res, next) => {
  try {
    //  пришло от заполнения формы
    const { email } = req.body;
    // перед тем как регестрировать пользователя, его нужно найти (юзера)
    const user = await users.findByEmail(email);
    // если пользователь есть (конфликт имен)
    // Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
    if (user) {
      // сообщаем о конфликте
      return res.status(HttpCode.CONFLICT).json({
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

const login = async (req, res, next) => {
  try {
    //  пришло от заполнения формы
    const { email, password } = req.body;
    // ищем пользователя по email
    const user = await users.findByEmail(email);
    // ждем приходящего промиса из статического метода user.validPassword
    const isValidPassport = await user.validPassword(password);
    // если пользователя с таким email нет,
    // и если пароль не валидный(валидация пароля (статический метод) validPassword в schemas/user)
    if (!user || !isValidPassport) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "Unauthorized",
        message: "Invalid credentials",
      });
    }

    // вытягиваем id пользователя
    const id = user._id;
    // создаем токен. В токен ложим полезную нагрузку
    const payload = { id };
    // срок годности токена 2 часа (expiresIn: '2h')
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    // В базу данный отправляем новый токен
    await users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user.id;
  // В базу данный отправляем новый обнулённый токен
  await users.updateToken(userId, null);
  return res.status(HttpCode.NO_CONTENT).json({
    message: "Nothung",
  });
};

module.exports = {
  registration,
  login,
  logout,
};
