const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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

// подключение mongoose-paginate-v2
contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
