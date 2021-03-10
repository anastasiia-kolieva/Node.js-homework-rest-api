## Домашнее задание 4
  Создай ветку 04-auth из ветки master.
  Продолжи создание REST API для работы с коллекцией контактов. Добавь логику аутентификации/авторизации пользователя через JWT.

      Шаг 1
В коде создай схему и модель пользователя для коллекции users.

{
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  },
  token: String
}
  Измените схему контактов, чтобы каждый пользователь видел только свои контакты. Для этого в схеме контактов добавьте свойство

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }

      Шаг 2
  Регистрация
  Создать ендпоинт /auth/register
  Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.
  В случае успешной валидации в модели User создать пользователя по данным которые прошли валидацию. Для засолки паролей используй bcrypt
  Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
  В противном случае вернуть Успешный ответ.

  Registration request
POST /auth/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

  Registration validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>
  
  Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}

  Registration success response
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}

  Логин
  Создать ендпоинт /auth/login
  В модели User найти пользователя по email.
  Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.
  В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть Успешный ответ.
  Если пароль или имейл неверный, вернуть Ошибку Unauthorized.

  Login request
POST /auth/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}

  Login validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>

  Login success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}

  Login auth error
Status: 401 Unauthorized
ResponseBody: Email or password is wrong

      Шаг 3
  Проверка токена
  Создай мидлвар для проверки токена и добавь его ко всем раутам которые должны быть защищены.
  Мидлвар берет токен из заголовков Authorization, проверяет токен на валидность.
  В случае ошибки вернуть Ошибку Unauthorized.
  Если валидация прошла успешно, получить из токена id пользователя. Найти пользователя в базе данных по этому id. Если пользователь существует, записать его данные в req.user и вызвать next(). Если пользователя с таким id не существет, вернуть Ошибку Unauthorized

  Middleware unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}

    Шаг 4
  Логаут
  Создать ендпоинт /auth/logout
  Добавь в раут мидлвар проверки токена.
  В модели User найти пользователя по _id.
Если пользователя не сущестует вернуть Ошибку Unauthorized.
В противном случае, удалить токен в текущем юзере и вернуть Успешный ответ.

  Logout request
POST /auth/logout
Authorization: "Bearer token"

  Logout unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}

  Logout success response
Status: 204 No Content

  Текущий - получить данные юзера по токену
  Создать ендпоинт /users/current
  Добавь в раут мидлвар проверки токена.
  Если пользователя не сущестует вернуть Ошибку Unauthorized
  В противном случае вернуть Успешный ответ

  Current user request
GET /users/current
Authorization: "Bearer token"

  Current user unauthorized error
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}

  Current user success response
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "free"
}
