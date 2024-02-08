'use strict';

const db = require('sequelize');

const { getUuid } = require('./utils'); // Assuming getUuid function is defined in utils.js

//////////////////////////////////////////////////////////////////////////
const emptyResponse = {
    record: {}
};
///////////////////////////////////////////////////\//////////////////////

function DBClient(opts = {}) {
    const self = this;
    _configure(self, opts);

    return {
        getSubscribersByServiceId: (serviceId) => getSubscribersByServiceId(self, serviceId),
        getNotificationChannels: () => getNotificationChannels(self),
        addSubscriber: (userId, notificationChannel, serviceId) => addSubscriber(self, userId, notificationChannel, serviceId),
        removeSubscriber: (userId, notificationChannel, serviceId) => removeSubscriber(self, userId, notificationChannel, serviceId),
        getSubscriberList: (notificationChannel, serviceId) => getSubscriberList(self, notificationChannel, serviceId)
    };
}

module.exports = DBClient;

function _configure(that, opts) {
    that.logger = opts.logger;
    that.db = db;
    // Add any configuration here if needed
}


/**
 * Fetches the list of notification channels from the database.
 * @returns {Promise<Array<Object>>} List of notification channels with their IDs and names.
 * @throws {Error} If an error occurs while fetching the channels from the database.
 */
async function getNotificationChannels(that) {
    try {
        const channels = await db.Channel.findAll({
            attributes: ['id', 'name'],
        });
        return channels.map(channel => ({ id: channel.id, name: channel.name }));
    } catch (error) {
        console.error('Error fetching notification channels from the database:', error);
        throw error;
    }
}


/**
 * Retrieves subscribers for a given service ID.
 * @param {number} serviceId - The service ID.
 * @returns {Promise<Array>} - A promise that resolves to an array of subscribers.
 */
async function getSubscribersByServiceId(that, serviceId) {
    try {
        // Query the database to get subscribers for the given service ID
        const subscribers = await db.Subscriber.findAll({
            where: { service_id: serviceId } // Assuming your column name is "service_id"
        });
        return subscribers;
    } catch (error) {
        console.error('Error fetching subscribers by service ID:', error);
        throw error;
    }
}

/**
 * Adds a new subscriber to the database.
 * @param {number} userId - The ID of the user to subscribe.
 * @param {string} notificationChannel - The notification channel to subscribe to.
 * @param {number} serviceId - The ID of the service for which the user is subscribing.
 * @throws {Error} If an error occurs while adding the subscriber to the database.
 */
async function addSubscriber(that, userId, notificationChannel, serviceId) {
    try {
        await db.Subscriber.create({
            subscriber_id: getUuid(), 
            user_id: userId,
            notification_channel: notificationChannel,
            service_id: serviceId
        });
        console.log('Subscriber added successfully.');
    } catch (error) {
        console.error('Error adding subscriber to the database:', error);
        throw error;
    }
}

/**
 * Removes an existing subscriber from the database.
 * @param {number} userId - The ID of the user to unsubscribe.
 * @param {string} notificationChannel - The notification channel to unsubscribe from.
 * @param {number} serviceId - The ID of the service for which the user is unsubscribing.
 * @throws {Error} If an error occurs while removing the subscriber from the database.
 */
async function removeSubscriber(that, userId, notificationChannel, serviceId) {
    try {
        await db.Subscriber.destroy({
            where: {
                user_id: userId,
                notification_channel: notificationChannel,
                service_id: serviceId
            }
        });
        console.log('Subscriber removed successfully.');
    } catch (error) {
        console.error('Error removing subscriber from the database:', error);
        throw error;
    }
}

/**
 * Retrieves a list of subscribers from the database based on notification channel and service ID.
 * @param {string} notification_channel - The notification channel.
 * @param {number} service_id - The ID of the service.
 * @returns {Promise<Array<number>>} List of user IDs subscribed to the specified channel and service.
 * @throws {Error} If an error occurs while fetching the subscriber list from the database.
 */
async function getSubscriberList(that, notificationChannel, serviceId) {
    try {
        const subscribers = await db.Subscriber.findAll({
            attributes: ['user_id'],
            where: {
                service_id: serviceId,
                notification_channel: notificationChannel
            }
        });
        return subscribers.map(subscriber => subscriber.user_id);
    } catch (error) {
        console.error('Error fetching subscriber list from the database:', error);
        throw error;
    }
}
