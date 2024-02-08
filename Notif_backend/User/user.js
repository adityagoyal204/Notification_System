const dbClient = require('./DBClient/dbClient');
/**
 * Represents a user.
 */
class User {
    /**
     * Constructs a new User object.
     * @param {string} id - The ID of the user.
     * @param {string} name - The name of the user.
     * @param {string} email - The email of the user.
     * @param {object} metaData - Additional metadata for the user.
     */
    constructor(id, name, email, metaData) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.metaData = metaData;
    }

    /**
     * Creates a new user.
     */
    create() {
        userList.add(this.id);
        this.dbClient = dbClient;
    }

    /**
     * Subscribes the user to notifications for a given service.
     * @param {string} serviceId - The ID of the service to subscribe to.
     */
    async subscribe(serviceId) {
        try {
            for (const channel of channelList) {
                await this.enableNotification(channel, serviceId);
            }
        } catch (error) {
            console.error('Error subscribing user:', error);
        }
    }

    /**
     * Unsubscribes the user from notifications for a given service.
     * @param {string} serviceId - The ID of the service to unsubscribe from.
     */
    async unsubscribe(serviceId) {
        try {
            for (const channel of channelList) {
                await this.disableNotification(channel, serviceId);
            }
        } catch (error) {
            console.error('Error unsubscribing user:', error);
        }
    }

    /**
     * Enables notifications for the user on a specific channel for a given service.
     * @param {string} notificationChannel - The channel to enable notifications on.
     * @param {string} serviceId - The ID of the service to enable notifications for.
     */
    async enableNotification(notificationChannel, serviceId) {
        try {
            await this.dbClient.addSubscriber(this.id, notificationChannel, serviceId);
        } catch (error) {
            console.error('Error enabling notification:', error);
        }
    }

    /**
     * Disables notifications for the user on a specific channel for a given service.
     * @param {string} notificationChannel - The channel to disable notifications on.
     * @param {string} serviceId - The ID of the service to disable notifications for.
     */
    async disableNotification(notificationChannel, serviceId) {
        try {
            await this.dbClient.removeSubscriber(this.id, notificationChannel, serviceId);
        } catch (error) {
            console.error('Error disabling notification:', error);
        }
    }
}

module.exports = User;
