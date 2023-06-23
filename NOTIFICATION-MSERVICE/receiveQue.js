const amqp = require('amqplib/callback_api');
const msgHandler = require("./messageHandler");

function ReceiveMsgRabbit(queue) {
    amqp.connect("amqp://localhost", function (error0, connection) {
        console.log("connect amqp");
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, {
                durable: false,
            });

            console.log(" [*] Waiting for messages in %s", queue);
            channel.consume(
                queue,
                function (msg) {
                    console.log(" [x] Received %s", msg.content.toString());
                    const jsonMessage = JSON.parse(msg.content.toString());
                    msgHandler.messageHandler(jsonMessage);
                },
                { noAck: true }
            );
        });
    });
}

module.exports = {
    ReceiveMsgRabbit,
}