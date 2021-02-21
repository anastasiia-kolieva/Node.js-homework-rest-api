const express = require('express')
// логгер запросов
const logger = require('morgan')
const cors = require('cors')

// подключение Роутера
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
// запуск логгера
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// если придёт сюда на /api/contacts(по ТЗ), то иди в contactsRouter
// всё что будет начинаться /api/contacts и после /api/contacts будет описано в файле contactsRouter
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

// запуск сервера выноситься отдельно, потому что подключение баз данных хорошо сделать в запуске сервера
// (если базу данных не получилось инициализировать, тогда мы не стартуем), 
// а так же с учётом будущего импорта приложения для тестирование(там будет свой сервер)
