const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email }).select("-__v");
};

const findById = async (id) => {
    // Что бы не передавать явно указанное название поля - _id можно использовать функции, 
    // в названии которых уже содержится слово id. Это специальные - именованные функции для 
    // поиска по полю id
  return await User.findById({ id }).select("-__v");
};

const create = async ({ name, email, password, subscription }) => {
  const user = new User({ name, email, password, subscription });
  return await user.save();
};

const updateToken = async (id, token) => {
    // тут явно указывается название поля, по которому будет  
    // производится поиск по базе данных - ById
  return await User.findByIdAndUpdate({ id }, { token });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
};
