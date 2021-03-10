const contacts = require("../model/contacts");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // В responce массив обектов контактов распарсенный
    const responce = await contacts.listContacts(userId, req.query);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        ...responce,
      },
    });
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // В req.params будет свойство contactId
    const contact = await contacts.getContactById(req.params.contactId, userId);
    // если искомый контакт есть(пришёл из getContactById)
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
      // если искомый контакт НЕ пришёл из getContactById
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
};

// создание контакта
const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // req.body это представление отсылаемого/создаваемого обьекта
    // передаем req.body в addContact
    const newContact = await contacts.addContact({
      ...req.body,
      owner: userId,
    });

    // res.status(201) обязательно
    return res.status(201).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

// сюда приходит json или какие-то параметры
const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // В req.params будет свойство contactId
    const contact = await contacts.removeContact(req.params.contactId, userId);
    // если искомый контакт есть(пришёл из getContactById)
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        message: "contact deleted",
        data: {
          contact,
        },
      });
      // если искомый контакт НЕ пришёл из getContactById
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
};

// обновить отдельное свойство
// validate.updateContact - валидация (промежуточное ПО)
const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // В req.params будет свойство contactId
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    );

    // если искомый контакт есть(пришёл из getContactById)
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        message: "Contact updated",
        data: {
          contact,
        },
      });
      // если искомый контакт НЕ пришёл из getContactById
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
