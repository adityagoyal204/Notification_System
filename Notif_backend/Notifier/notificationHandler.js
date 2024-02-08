'use strict';

/**
 * Module for handling incoming notification messages and sending them to appropriate Kafka topics.
 * @module NotificationHandler
 */

const { producer } = require('../Kafka/kafkaQueue');
const dbClient = require('../DBClient/dbClient');

/**
 * Handles incoming notification messages and sends them to appropriate Kafka topics.
 * @param {number} serviceId - The ID of the service sending the notification.
 * @param {string} notificationMessage - The notification message.
 * @returns {Promise<void>} - A promise that resolves once the notification is handled.
 */
function handleNotification(serviceId, notificationMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetch all subscribers for the given service
            const subscribers = await dbClient.getSubscribersByServiceId(serviceId);

            // Group subscribers by notification channel
            const subscribersByChannel = groupSubscribersByChannel(subscribers);

            // Send notification messages to Kafka topics for each channel
            for (const [channel, subscribers] of Object.entries(subscribersByChannel)) {
                await producer.send({
                    topic: channel, // Kafka topic for each notification channel
                    messages: [
                        { value: JSON.stringify({ subscribers, notificationMessage }) }
                    ]
                });
            }
            resolve();
        } catch (error) {
            console.error('Error handling notification:', error);
            reject(error);
        }
    });
}

/**
 * Groups subscribers by notification channel.
 * @param {Array} subscribers - The array of subscriber objects.
 * @returns {Object} - An object where keys are notification channels and values are arrays of subscriber IDs.
 */
function groupSubscribersByChannel(subscribers) {
    const subscribersByChannel = {};
    subscribers.forEach(subscriber => {
        subscriber.notificationChannels.forEach(channel => {
            if (!subscribersByChannel[channel]) {
                subscribersByChannel[channel] = [];
            }
            subscribersByChannel[channel].push(subscriber.userId);
        });
    });
    return subscribersByChannel;
}

module.exports = { handleNotification };
