const kafka = require('kafka-node');
const config = require('config');
const async = require('async');

module.exports = (handler, options) => {
  const cgOptions = {
    ...options.consumerGroup,
    host: config.get('zookeeper.host'),
  };

  const consumer = new kafka.ConsumerGroup(cgOptions, options.topics);

  const concurrency = options.concurrency || 1;
  const queue = async.queue(async (message) => {
    await handler(message);
  }, concurrency);

  // resume the consumer on drain
  queue.drain = () => {
    console.log('Kafka concurrent messages: All items have been processed');

    consumer.resume();
  };

  consumer.on('message', (message) => {
    consumer.pause();

    try {
      const decodedMessage = JSON.parse(message.value);

      // add some items to the queue
      queue.push(decodedMessage, (err) => {
        if (err) {
          console.log(`Kafka consumer ${cgOptions.groupId} Error`, err);
          return;
        }

        console.log('Kafka concurrent messages: Queued a message');
      });
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
