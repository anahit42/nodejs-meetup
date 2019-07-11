require('dotenv').load();

const config = require('config');
const kafkaClient = require('./libs/kafka-client');
const MailerLib = require('./libs/mailer');

kafkaClient(async (message) => {
  try {
    await MailerLib.sendUserRegistrationEmail(message.email, message.data);
  } catch (err) {
    console.log('Error handler', err);
  }
}, config.get('consumer'));
