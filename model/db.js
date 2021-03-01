require("dotenv").config();
// URI подключение к базе данных
const uriDb = process.env.DB_HOST;

// подключаю Mongoose
const mongoose = require("mongoose");
// Подключения к базе выполняется методом mongoose.connect(),
// в который первым параметром передается адрес на подключение к базе данных, а вторым объект настроек:
const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//   когда connect произошёл, у самого connect есть обработчик событий connection
// событие connected - то что мы присоеденились к базе данных
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

// при возникновении ошибки вовремя connect
mongoose.connection.on("error", (error) => {
  console.log(`Mongoose connected with error: ${error.message}`);
});

// событие disconnect - то что мы отсоеденились от базы данных
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from db");
});

// const blogSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });

// при принудительной остановке приложения, чтоб коннекшены не накапливались
process.on("SIGINT", async () => {
  // закрываем соединение
  mongoose.connection.close(() => {
    console.log("Connection for db closed");
    // завершить процесс используя process.exit(1)
    process.exit(1);
  });
});

module.exports = db;
