const amqp = require('amqplib/callback_api');

function sendMsgRabbit(queue, msg) {
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

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
    });
}

module.exports = {
    sendMsgRabbit,
};