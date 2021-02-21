const fs = require('fs').promises
const path = require("path");
// import shortid from "shortid";

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    // данные с прочитки файла contacts.json
    const data = await fs.readFile(contactsPath);

    // JSON.parse необходимо чтоб распарсить в обьект, потому что там строка сформированна
     return JSON.parse(data.toString());
  } catch (error) {
    console.log (error);
  }
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
