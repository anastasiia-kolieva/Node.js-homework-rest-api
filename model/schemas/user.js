const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
// сколько раз будем солить пароль(минимум 6)
const SALT_WORK_FACTOR = 8;
const { Subscription } = require("../../helpers/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlenght: 3,
      default: "Guest",
      required: [true, "Set name of user"],
    },
    email: {
      type: String,
      required: [true, "Set email of user"],
      unique: true,
      validate(value) {
        //   валидация email(регулярка)(символы+собака+символы+точка+символы)
        //   const re = /\S+@\S+\.\S+/
        const re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
        // возвращает логическое значение-да или нет
        // обязательно value приводить к строке
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Set password"],
    },
    subscription: {
      type: String,
      enum: {
        value: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
        //   сообщение об ошибке
        message: "It isn't allowed",
      },
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// когда вызывается метод save, этот код сработает
// создать и засолить пароль
userSchema.pre("save", async function (next) {
  // проверка, если пароль модифицирован, не нужно повторно солить. просто выйти
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // пароль засолить и создать
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

// валидация пароля (статический метод)
userSchema.method.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
