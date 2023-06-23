const sendMail = require('./sendMail');
const messageHandler = (data) => {
    if (data.Event == "UserAccess") {
        sendMail.SendMailWhenAccess(data.UserEmail);
    }
};

module.exports = {
    messageHandler,
}