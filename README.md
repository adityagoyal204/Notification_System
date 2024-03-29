
# High Level Design

![Notification System](https://github.com/adityagoyal204/Notification_System/assets/58358589/491c8a96-ae64-4189-8380-5dbcf97c8488)

# Low Level Design

![image](https://github.com/adityagoyal204/Notification_System/assets/58358589/1de8d763-a9c1-480c-a95e-b36a632ae4f8)




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

Service API

- `handleNotification(msg, serviceId)`: Used to send msg from service to the Notifier, it acts as a 1st point of contact which recieves the msg and serviceId and then directs it to the appropriate recievers/users.

User API

- `getNotificationChannels()`: Fetches the list of available notification channels.
  
- `addSubscriber(userId, notificationChannel, serviceId)`: Adds a new subscriber to receive notifications for a specific service via a chosen channel.

- `removeSubscriber(userId, notificationChannel, serviceId)`: Removes an existing subscriber from receiving notifications for a specific service via a chosen channel.

- `getSubscriberList(notificationChannel, serviceId)`: Retrieves a list of subscribers for a specific service and notification channel.

## Integration

Integrate the Notification System with your existing services by calling the appropriate API methods to manage subscribers and trigger notifications. Use Kafka for event-driven architecture and ensure proper communication with the Notifier service for efficient notification delivery.
