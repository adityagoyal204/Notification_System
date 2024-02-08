
# High Level Design
![Notification Image](Notification Image.png)


# Overview

The Notification System is a robust module designed to facilitate seamless communication with users by sending notifications through various channels such as email, SMS, push notifications, etc. It integrates with Kafka for event-driven architecture and employs a Notifier service to efficiently handle notification delivery. Additionally, it interacts with a User service to manage user subscriptions and preferences.

# Features

- **Subscriber Management**: Users can subscribe or unsubscribe from notifications for specific services via different channels.
  
- **Channel Support**: Supports multiple notification channels such as email, SMS, push notifications, etc.
  
- **Event-Driven Architecture**: Integrates with Kafka to enable event-driven notification delivery.
  
- **Notifier Service**: Efficiently delivers notifications to users through selected channels.
  
- **User Management**: Interacts with the User service to manage user subscriptions and preferences.
  
- **Error Handling**: Robust error handling mechanisms to ensure reliability and fault tolerance.

# Components

The Notification System consists of the following components:

1. **Database Client (DBClient)**: Manages interactions with the database for storing subscriber information, notification channels, and service configurations.

2. **Notifier Service**: Orchestrates the delivery of notifications to users through various channels based on subscription preferences.

3. **Kafka Integration**: Communicates with Kafka for event-driven notification delivery.

4. **User Service Integration**: Interacts with the User service to manage user subscriptions and preferences.

# Usage

## Installation

1. Clone the Notification System repository from GitHub.

```
git clone https://github.com/your/notification-system.git
```

2. Install dependencies using npm or yarn.

```
npm install
```

or

```
yarn install
```

## Configuration

1. Configure the database connection settings in the `config.js` file.

2. Set up the required notification channels and services in the database.

3. Configure Kafka connection settings in the `kafka-config.js` file.

## API

The Notification System provides the following API methods:

- `getNotificationChannels()`: Fetches the list of available notification channels.
  
- `addSubscriber(userId, notificationChannel, serviceId)`: Adds a new subscriber to receive notifications for a specific service via a chosen channel.

- `removeSubscriber(userId, notificationChannel, serviceId)`: Removes an existing subscriber from receiving notifications for a specific service via a chosen channel.

- `getSubscriberList(notificationChannel, serviceId)`: Retrieves a list of subscribers for a specific service and notification channel.

## Integration

Integrate the Notification System with your existing services by calling the appropriate API methods to manage subscribers and trigger notifications. Use Kafka for event-driven architecture and ensure proper communication with the Notifier service for efficient notification delivery.
