const getMessages = require("../clients/getMessages");
const promCounter = require("../../promCounter.js")

const counter = promCounter("getMessageExample", "getMessageExample")

module.exports = function (req, res) {
  getMessages().then(messages => {
    counter.inc({ code: 201 })
    res.json(messages);
  });
};
