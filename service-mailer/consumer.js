require('dotenv').load();

const config = require('config');
const kafkaClient = require('./libs/kafka-client');
const MailerLib = require('./libs/mailer');

kafkaClient(async (message) => {
  try {
    const { email_type } = message;
    console.log('Consumed message type', email_type);

    switch (email_type) {
      case 'account-create':
        await MailerLib.sendUserRegistrationEmail(message.email, message.data);
        break;
      default:
        console.log(`${email_type} message type is not supported.`)
    }
  } catch (err) {
    console.log('Error handler', err);
  }
}, config.get('consumer'));
