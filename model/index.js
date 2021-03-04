const Contact = require("./schemas/contact");

const listContacts = async () => {
  try {
    const data = await Contact.find({},{"__v":0});
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = Contact.findOne({ _id: contactId }).select("-__v");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const deletedContact = Contact.findOneAndRemove({ _id: contactId });
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      // новое значение
      { new: true }
    );
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
