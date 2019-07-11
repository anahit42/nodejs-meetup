const config = require('config');
const bluebird = require('bluebird');

const kafkaProducer = require('../libs/kafka-producer');

async function sendKafkaMessage(message) {
  const payloads = [{
    topic: config.get('producer.topics.userEmails'),
    messages: JSON.stringify(message),
  }];

  return new bluebird((resolve, reject) => {
    return kafkaProducer.send(payloads, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  })
}

class MailerService {
  static async sendWelcomeEmail(email, mailData) {
    console.log('Sending welcome message to kafka');

    const message = {
      email_type: 'account-create',
      data: mailData,
      email,
    };

    try {
      await sendKafkaMessage(message);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = MailerService;
