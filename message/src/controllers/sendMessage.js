const sendMessage = require("../jobs/sendMessage");
const logger = require("loglevel");
const promCounter = require("../../promCounter.js")

const counter = promCounter("sendMessageExample", "sendMessageExample")

module.exports = function (req, res) {
  sendMessage(req.body)
    .then((messageId) => {
      const response = {
        messageId,
      };
      counter.inc({ code: 201 })
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    })
    .catch((error) => {
      logger.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    });
};
