const express = require("express");
const router = express.Router();
const contacts = require("../../model/index.js");

router.get("/", async (req, res, next) => {
  try {
    const responce = await contacts.listContacts();
    return res.json(responce);
  } catch (error) {
    // пробросить дальше ошибку
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
