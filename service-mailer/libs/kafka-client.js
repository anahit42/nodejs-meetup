const kafka = require('kafka-node');
const config = require('config');

module.exports = (callback, options) => {
  const cgOptions = {
    ...options.consumerGroup,
    host: config.get('zookeeper.host'),
  };

  const consumer = new kafka.ConsumerGroup(cgOptions, options.topics);

  consumer.on('message', (message) => {
    try {
      const decodedMessage = JSON.parse(message.value);
      callback(decodedMessage);
    } catch (err) {
      console.log(`Kafka consumer ${cgOptions.groupId} Error`, err);
    }
  });

  consumer.on('ready', () => {
    console.log(`Kafka consumer ${cgOptions.groupId} connected to ${cgOptions.host}`);
  });

  consumer.on('error', (err) => {
    console.log(err);

    // throwing this error will make pm2 to retry connection
    throw new Error(`Kafka consumer ${cgOptions.groupId} Error`);
  });

  process.on('SIGINT', () => {
    const msg = `Kafka consumer ${cgOptions.groupId} Error. Received SIGINT. Consumer closed.`;
    consumer.close(true, () => {
      console.log(msg);

      // throwing this error will make pm2 to retry connection
      throw new Error(msg);
    });
  });
};
