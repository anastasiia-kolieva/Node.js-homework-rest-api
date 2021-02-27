const { MongoClient} = require('mongodb')
require('dotenv').config()
// URI подключение к базе данных
const uriDb = process.env.DB_HOST

// Теперь, когда у нас есть URI, мы можем создать экземпляр MongoClient.
// db возвращает промис
const db = MongoClient.connect(uriDb, {
    useUnifiedTopology: true,
    // poolsize это сколько конекшенов к базе данных от нашего приложения
    poolSize = 5,
})

// при принудительной остановке приложения, чтоб коннекшены не накапливались
process.on('SIGINT', async () => {
    // когда db зарезолвиться, вернёться client
    const client = await db;
    // client закрываем
    client.close();
    console.log('Connection for db closed');
    // завершить процесс используя process.exit(1)
    process.exit(1);
})

module.exports = db;