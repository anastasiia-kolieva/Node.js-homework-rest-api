const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema({
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
    type: Number,
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
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
