## Домашнее задание 2
Написать REST API для работы с коллекцией контактов. Для работы с REST API используй Postman.

Шаг 1
Установи в командой
npm i
следующие пакеты в проекте express, morgan и cors.

Шаг 2
В app.js веб сервер на express и добавлены прослойки morgan и cors. Настраивай роутинг для работы с коллекцией контактов.
REST API должен поддерживать следующие рауты.

@ GET /api/contacts
ничего не получает
вызывает функцию listContacts для работы с json-файлом contacts.json
возвращает массив всех контактов в json-формате со статусом 200

@ GET /api/contacts/:contactId
Не получает body.Получает параметр contactIdю Вызывает функцию getById для работы с json-файлом contacts.json, если такой id есть, возвращает обьект контакта в json-формате со статусом 200, если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404.

@ POST /api/contacts
Получает body в формате {name, email, phone}. Если в body нет каких-то обязательных полей, возарщает json с ключом {"message": "missing required name field"} и статусом 400. Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта. Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json. По результату работы функции возвращает обьект с добавленным id {id, name, email, phone} и статусом 201.

@ DELETE /api/contacts/:contactId
Не получает body. Получает параметр contactId. Вызывает функцию removeContact для работы с json-файлом contacts.json, если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200, если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404.

@ PATCH /api/contacts/:contactId
Получает параметр contactId. Получает body в json-формате c обновлением любых полей name, email и phone. Если body нет, возарщает json с ключом {"message": "missing fields"} и статусом 400. Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json. По результату работы функции возвращает обновленный обьект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404.
