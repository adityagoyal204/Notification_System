const dbClient = require('DBClient/dbClient');

class Channel {
    constructor(id, channelName) {
        this.id = id;
        this.name = channelName;
        this.subscriberList = {}; // Initialize subscriberList as an empty object
        this.dbClient = dbClient;
    }

    /**
     * Adds this channel to the database.
     * @returns {Promise<void>} - A promise that resolves when the channel is added successfully.
     */
    async add() {
        try {
            await this.dbClient.addChannel(this.id, this.name);
            console.log(`Channel ${this.name} added to the database.`);
        } catch (error) {
            console.error('Error adding channel to the database:', error);
            throw error;
        }
    }

    /**
     * Removes this channel from the database.
     * @returns {Promise<void>} - A promise that resolves when the channel is removed successfully.
     */
    async remove() {
        try {
            await dbClient.removeChannel(this.id);
            console.log(`Channel ${this.name} removed from the database.`);
        } catch (error) {
            console.error('Error removing channel from the database:', error);
            throw error;
        }
    }

    /**
     * Gets the subscriber list for this channel corresponding to a particular serviceID.
     * @param {number} serviceId - The service ID.
     * @returns {Promise<Array>} - A promise that resolves to an array of subscriber IDs.
     */
    async getSubscriberList(serviceId) {
        try {
            return await dbClient.getSubscriberList(this.id, serviceId);
        } catch (error) {
            console.error('Error fetching subscriber list:', error);
            return []; // Return an empty array in case of error
        }
    }
}

module.exports = Channel;
