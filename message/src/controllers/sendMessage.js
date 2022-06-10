import http from "http"
import saveMessage from "../clients/saveMessage.js"
import returnMoneyQueue from "../queues/returnMoneyQueue.js"

import 'dotenv/config'

const MESSAGE_PRICE = 2

export default async (body) => {

  if (body.status === "Not enough money") {
    await saveMessage({
      destination: body.destination,
      body: body.body,
      taskId: body.taskId,
      status: "Not enough money",
    })
    return "Please Top Up"
  }

  // Creating request to send to Message App
  const postOptions = {
    host: process.env.MESSAGEAPP,
    port: 3000,
    path: "/message",
    method: "post",
    json: true,
    headers: {
      "Content-Type": "application/json",
    },
  }

  const postReq = http.request(postOptions);

  postReq.on("response", async (postRes) => {

    try {
      await saveMessage({
        destination: body.destination,
        body: body.body,
        taskId: body.taskId,
        status: postRes.statusCode === 200 ? "OK" : "ERROR",
      })
      if (postRes.statusCode !== 200) {
        console.log('Error in the messageapp request')
        throw new Error('Error in the messageapp request');
      }
      
      console.log(postRes.body);
      
    } catch (error) {
      
      returnMoneyQueue({amount:MESSAGE_PRICE})

      console.log(`Internal server error: SERVICE ERROR ${error.message} Your money was returned`);
    }
  })

  postReq.on("timeout", async () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    try {
      await saveMessage({
        destination: body.destination,
        body: body.body,
        taskId: body.taskId,
        status: "TIMEOUT",
      })

    } finally {
      returnMoneyQueue({ amount: MESSAGE_PRICE })
      console.log("Internal server error: TIMEOUT");
    }
  });

  postReq.on("error", (error) => {
    console.log(error.message);
  });

  const bodyString = {
    destination: body.destination,
    body: body.body
  }

  const payload = JSON.stringify(bodyString)
  
  
  postReq.write(payload);

  postReq.end();

}
