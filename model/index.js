const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    // данные с прочитки файла contacts.json
    const data = await fs.readFile(contactsPath);

    // JSON.parse необходимо чтоб распарсить в обьект, потому что там строка сформированна
    return JSON.parse(data.toString());
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    // данные с прочитки файла contacts.json
    const parseData = JSON.parse(data.toString());

    //в данных с прочитки файла contacts.json ищем необходимый контакт по id
    const contact = parseData.find((contact) => contact.id == contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());
    const deletedContact = parseData.find((contact) => contact.id == contactId);

    const filteredContacts = parseData.filter(
      (contact) => contact.id != contactId
    );

    if (filteredContacts.length !== parseData.length) {
      // если отфильтрованный массив контактов НЕ равен изначальному массиву, значит искомый контакт убрали
      // перезаписываем файл (путьcontactsPath ) с контактами. В него записываем масив filteredContacts
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      return deletedContact;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

// c req.body приходит name, email, phone нового контакта
const addContact = async ({ name, email, phone }) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());
    const newContact = { id: shortid.generate(), name, email, phone };

    parseData.push(newContact);
    // перезаписываем файл (путь contactsPath ) с контактами. В него записываем масив parseData
    await fs.writeFile(contactsPath, JSON.stringify(parseData));
    // отправляем новый созданный контакт
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    // данные с прочитки файла contacts.json
    const parseData = JSON.parse(data.toString());
    //в данных с прочитки файла contacts.json ищем необходимый контакт по id
    const contact = parseData.find((contact) => contact.id == contactId);
    // в обновлённый контакт(updatedContact) распыляем свойства найденного по id контакта,
    // и поверх приходящие новые значения body
    const updatedContact = { ...contact, ...body };

    const filteredContacts = parseData.filter(
      (contact) => contact.id != contactId
    );

    const updatedArrayOfContacts = [updatedContact, ...filteredContacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedArrayOfContacts));
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
