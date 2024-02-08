const { consumer } = require('../kafkaQueue');
const thirdPartyServiceList = require('thirdPartyServiceList');

class NotificationConsumer {
    constructor(channel) {
        this.topic = channel;
        this.thirdPartyService = thirdPartyServiceList[channel];
    }

    async start() {
        await consumer.connect();
        await consumer.subscribe({ topic: this.topic });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { subscribers, notificationMessage } = JSON.parse(message.value.toString());
                try {
                    // Send notifications to subscribers using the third-party service
                    await this.thirdPartyService.sendNotification(subscribers, notificationMessage);
                    console.log(`${this.topic} notification sent:`, notificationMessage);
                } catch (error) {
                    console.error(`Error sending ${this.topic} notification:`, error);
                }
            },
        });
    }
}

module.exports = NotificationConsumer;
