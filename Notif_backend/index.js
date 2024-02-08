const express = require('express');
const bodyParser = require('body-parser');
const { createConsumer, createTopics } = require('./Kafka/kafkaQueue');
const { handleNotification } = require('./Notifier/notificationHandler');
const dbClient = require('./DBClient/dbClient');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route to handle incoming notifications
app.post('/notification', async (req, res) => {
    const { serviceId, message } = req.body;
    if (!serviceId || !message) {
        return res.status(400).send('Missing required parameters: serviceId and message');
    }

    try {
        await handleNotification(serviceId, message);
        return res.status(200).send('Notification queued successfully');
    } catch (error) {
        console.error('Error queuing notification:', error);
        return res.status(500).send('Internal server error');
    }
});

// Start the server
const startServer = async () => {
    await createTopics(); // Create Kafka topics for notification channels

    // Retrieve notification channels from the database
    const notificationChannels = await dbClient.getNotificationChannels();
    notificationChannels = notificationChannels.map(channel => channel[1]);
    
    if (!notificationChannels || !notificationChannels.length) {
        console.error('No notification channels found in the database.');
        return;
    }

    // Create Kafka consumers for each notification channel
    notificationChannels.forEach(async (channel) => {
        await createConsumer(channel);
        console.log(`Kafka consumer created for ${channel} channel.`);
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer().catch(error => {
    console.error('Error starting server:', error);
});
