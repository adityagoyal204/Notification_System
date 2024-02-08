// Subscribers
// | subscriber_id | user_id | service_id | notification_channel |
// |---------------|---------|------------|----------------------|
// |       1       |    1    |     1      |        email         |
// |       2       |    1    |     2      |        email         |
// |       3       |    2    |     1      |         sms          |
// |       4       |    2    |     1      |         push         |
// |       5       |    2    |     3      |        email         |


// CREATE TABLE Subscribers (
//     subscriber_id INT PRIMARY KEY,
//     user_id INT,
//     service_id INT,
//     notification_channel VARCHAR(50),
//     FOREIGN KEY (service_id) REFERENCES Services(service_id)
// );



// Services
// | service_id | service_name |
// |------------|--------------|
// |     1      |  Service A   |
// |     2      |  Service B   |
// |     3      |  Service C   |

// CREATE TABLE Services (
//     service_id INT PRIMARY KEY,
//     service_name VARCHAR(255)
// );



// Channels
// | channel_id | channel_name |
// |------------|--------------|
// |     1      |  sms         |
// |     2      |  email       |
// |     3      |  push        |

// CREATE TABLE Services (
//     channel_id INT PRIMARY KEY,
//     channel_name VARCHAR(255)
// );


// userList
// |    user_id    |   name  |    email   |   other_datail       |
// |---------------|---------|------------|----------------------|
// |       1       |    x    |     /      |        //////        |
// |       2       |    y    |     /      |        ......        |
// |       3       |    z    |     /      |         .....        |
// |       4       |    q    |     /      |         .....        |
// |       5       |    b    |     /      |        .....         |

