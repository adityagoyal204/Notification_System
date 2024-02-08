const { Kafka } = require('kafkajs');
const NotificationConsumer = require('./Consumer/consumer');
const DBClient = require('../DBClient/dbClient');

// Kafka configuration
const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9092'] // Replace with Kafka broker's address
});

// Create Kafka producer
const producer = kafka.producer();

// Function to create Kafka consumers for each notification channel
const createConsumer = async (channel) => {
    const consumer = kafka.consumer({ groupId: `${channel}-group` });
    const notificationConsumer = new NotificationConsumer(channel);
    await notificationConsumer.start();
};

// Function to create Kafka topics for each notification channel
const createTopics = async () => {
    try {
        const admin = kafka.admin();
        await admin.connect();
        const topics = DBClient.getNotificationChannels();
        await admin.createTopics({
            topics: topics.map(topic => ( topic =>topic[1] )),
        });
        console.log('Topics created successfully:', topics);
        await admin.disconnect();
    } catch (error) {
        console.error('Error creating topics:', error);
    }
};

module.exports = {
    producer,
    createConsumer,
    createTopics
};
