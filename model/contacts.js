const Contact = require("./schemas/contact");

const listContacts = async (userId) => {
  try {
    const data = await Contact.find({ owner: userId }, { __v: 0 }).populate({
      path: "owner",
      select: "name email",
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const data = Contact.findOne({ _id: contactId, owner: userId })
      .select("-__v")
      .populate({
        path: "owner",
        select: "name email",
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const deletedContact = Contact.findOneAndRemove({
      _id: contactId,
      owner: userId,
    });
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

const updateContact = async (contactId, body, userId) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: userId },
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
