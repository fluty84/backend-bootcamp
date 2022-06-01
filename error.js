const MessageAppService = require("./services/messageapp.service")

const haveKeys = () => {
    MessageAppService
    .saveMessage()
    .then(response => console.log(response))
}

console.log("working")
haveKeys()

module.exports = errorTesting