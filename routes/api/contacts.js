const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contacts");
const validate = require("./validation.js");

router
  .get("/", contactsControllers.getAll)
  .post("/", validate.createContact, contactsControllers.create);

router
  .get("/:contactId", validate.validationIdOfContact, contactsControllers.getById)
  .delete("/:contactId", validate.validationIdOfContact, contactsControllers.remove)
  .patch("/:contactId", validate.updateContact, contactsControllers.update);

module.exports = router;
