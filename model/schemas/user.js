const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
// сколько раз будем солить пароль(минимум 6)
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlenght: 3,
      default: "Guest",
      required: [true, "Set name of contact"],
    },
    email: {
      type: String,
      required: [true, "Set email of contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    subscription: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Set password"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps:true }
);

const User = model("user", userSchema);

module.exports = User;
