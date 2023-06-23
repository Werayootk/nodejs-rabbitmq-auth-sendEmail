const express = require('express');
const jwt = require('jsonwebtoken');
const rabbitMsg = require('./sendToQue');
const app = express();
app.use(express.json());

const port = process.env.PORT || 8898;
var privateKey = "TestPrivateKey";

app.get("", (req, res) => {
    res.status(200).json("Hello world");
});

app.post("/api/access", (req, res) => {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
        var response = {
            status: "Unauthorized",
        };
        res.status(403).json(response);
        return false;
    }
    
    var token = jwt.sign({ foo: "bar" }, privateKey);
    var response = {
        userJwt: token,
        status: "Success",
    };
    res.status(200).json(response);
    
    //send to RabbitMQ
    const queue = "UserAccess";
    const msg = {
        Event: "UserAccess",
        UserEmail: Username,
        AccessStatus: "Success",
    };
    rabbitMsg.sendMsgRabbit(queue, JSON.stringify(msg));
});

app.listen(port, () => {
    console.log("Auth MService server is running on port: ", port);
});