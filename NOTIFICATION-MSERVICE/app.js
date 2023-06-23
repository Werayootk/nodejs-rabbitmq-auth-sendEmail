const rabbitMsg = require('./receiveQue');
const express = require('express');
const app = express();
const port = process.env.PORT || 8899;

const queue = "UserAccess";
rabbitMsg.ReceiveMsgRabbit(queue);

app.listen(port, () => {
    console.log("Notification MService server is running on port: ", port);
});