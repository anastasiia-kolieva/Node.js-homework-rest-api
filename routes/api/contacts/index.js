const express = require("express");
const router = express.Router();
const contactsControllers = require("../../../controllers/contacts");
const validate = require("./validation.js");
const guard = require('../../../helpers/guard');

router
  .get("/", guard, contactsControllers.getAll)
  .post("/", guard, validate.createContact, contactsControllers.create);

router
  .get("/:contactId", guard, validate.validationIdOfContact, contactsControllers.getById)
  .delete("/:contactId", guard, validate.validationIdOfContact, contactsControllers.remove)
  .patch("/:contactId", guard, validate.updateContact, contactsControllers.update);

module.exports = router;
