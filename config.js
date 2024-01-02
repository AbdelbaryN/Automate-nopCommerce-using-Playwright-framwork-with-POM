// config.js

const fs = require('fs');
const faker = require('faker');

const getEmailFilePath = () => 'email.txt';

module.exports = {
  generateRandomEmail: () => {
    return faker.internet.email();
  },
  saveEmailToFile: (email) => {
    fs.writeFileSync(getEmailFilePath(), email);
  },
  getEmailFromFile: () => {
    return fs.readFileSync(getEmailFilePath(), 'utf-8').trim();
  },
};
