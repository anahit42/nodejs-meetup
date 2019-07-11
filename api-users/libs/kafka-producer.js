const kafka = require('kafka-node');
const config = require('config');

module.exports = (() => {
  const zkHost = config.get('zookeeper.host');
  const clientId = config.get('producer.clientId');

  console.log(`Zookeeper host ${zkHost}, client Id ${clientId}`);

  const client = new kafka.Client(zkHost, clientId);
  const producer = new kafka.Producer(client);

  producer.on('ready', () => {
    console.log(`Kafka producer ${clientId} connected to ${zkHost}`);
  });

  producer.on('error', (err) => {
    console.log(`Kafka producer ${clientId} failed to connected to ${zkHost}`, err);
  });

  return producer;
})();
