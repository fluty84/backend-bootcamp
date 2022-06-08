import bodyParser from "body-parser"
import express from "express"
import redisStart from "./src/redisStart.js"

import { ValidationError, Validator } from "express-json-validator-middleware"

import getMessages from "./src/controllers/getMessages.js"
import sendMessage from "./src/controllers/sendMessage.js"
import topUp from "./src/controllers/topUp.js"
import getMessageStatus from "./src/clients/getMessageStatus.js"

import { Message, MessageBackup } from "./src/models/message.js"
import cleanPendingProcess from "./src/utils/cleanPendingProcess.js"


const app = express()
const redis = redisStart()

const validator = new Validator({ allErrors: true })
const { validate } = validator


// Validate models

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
};

const budggetSchema = {
  type: "object",
  required: ["amount"], 
  properties: {
    amount : {
      type: "number"
    },
  }, 
}

// Create message

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  sendMessage
)

// Get messeges

app.get("/messages", getMessages);

// Get process status

app.get("/message/:messageId/status", getMessageStatus)

//Top Up Credit

app.post(
  "/credit", 
  bodyParser.json(), 
  validate({body:budggetSchema}), 
  topUp
)


app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
})



const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
