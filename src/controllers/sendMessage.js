import http from "http"
import saveMessage from "../clients/saveMessage.js"
import checkBudget from "../clients/checkBudget.js"
import changeBudgetBy from "../clients/changeBudgetBy.js"
import 'dotenv/config'
import queue from "../utils/queue.js"
import uniqid from 'uniqid'



const MESSAGE_PRICE = 2

export default async (req, res) => {

  const body = JSON.stringify(req.body)

  const actualMoney = await checkBudget()

  if (actualMoney?.amount <= MESSAGE_PRICE -1) {
    return res.status(500).json("Please Top Up")
  } else {
    changeBudgetBy(-MESSAGE_PRICE)
  }

  const messageSender = (body, taskId) => {

    const postOptions = {
      host: process.env.SERVER,
      port: 3000,
      path: "/message",
      method: "post",
      json: true,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const postReq = http.request(postOptions);

    postReq.on("response", async (postRes) => {

      try {
        await saveMessage({
          ...req.body,
          status: postRes.statusCode === 200 ? "OK" : "ERROR",
          taskId
        });
        if (postRes.statusCode !== 200) {
          throw new Error('Error in the messageapp request');
        }

        res.statusCode = 200;
        res.end(postRes.body);

      } catch (error) {

        changeBudgetBy(MESSAGE_PRICE)
        console.log(error.message, "Your money was returned")
        res.statusCode = 500;
        res.end(`Internal server error: SERVICE ERROR ${error.message} Your money was returned`);
      }
    })

    postReq.on("timeout", async () => {
      console.error("Timeout Exceeded!");
      postReq.abort();

      try {
        await saveMessage({
          ...req.body,
          status: "TIMEOUT",
          taskId
        });

      } finally {
        changeBudgetBy(MESSAGE_PRICE)
        res.statusCode = 500;
        res.end("Internal server error: TIMEOUT");
      }
    });

    postReq.on("error", (error) => {
      res.statusCode = 500;
      res.end(error.message);
    });

    postReq.write(body);
    postReq.end();

  }

  const taskId = uniqid() ///Creates an ID to bound tasks status

  try {
    await saveMessage({
      ...req.body,
      status: "PENDING",
      taskId
    })
  }
  catch (error) {
    return res.status(500).json("Error saving message", error)
  }

  queue(messageSender(body, taskId), taskId)

}
