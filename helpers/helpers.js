const fs = require("fs").promises;

const readData = (contactsPath) => {
  return fs.readFile(contactsPath);
};

const parceData = (data) => {
  return JSON.parse(data.toString());
};

const writeData = (contactsPath, data) => {
  return fs.writeFile(contactsPath, JSON.stringify(data));
};

module.exports = { readData, parceData, writeData };
