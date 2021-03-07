const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
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
    owner: {
      type: SchemaTypes.ObjectId,
      // где их искать(связь)=(юзер)
      // каждый пользователь будет создавать свои контакты
      ref: "user",
    },
  },
  { timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
