const getMessage = require("../clients/getMessage");
const promCounter = require("../../promCounter.js")

const counter = promCounter("getStatusExample", "getStatusExample")
const responses = require("../../promMetrics")

module.exports = function (req, res) {
  const messageId = req.params.messageId;
  const conditions = {
    _id: messageId
  };

  getMessage(conditions)
    .then(message => {
      if (message == null) {
        counter.inc({ code: 501 })
        res.statusCode = 404;
        res.end("Message not found");
      } else {
        counter.inc({ code: 201 })
        res.json({
          messageId,
          status: message.status
        });
      }
    })
};