import express from "express"
import bodyParser from "body-parser"

import topUp from "./src/controllers/topUp.js"

import { ValidationError, Validator } from "express-json-validator-middleware"

const validator = new Validator({ allErrors: true })
const { validate } = validator

console.log("working credit app")
const app = express()


const budggetSchema = {
    type: "object",
    required: ["amount"],
    properties: {
        amount: {
            type: "number"
        },
    },
}

//Top Up Credit

app.post(
    "/credit",
    bodyParser.json(),
    validate({ body: budggetSchema }),
    topUp
)




const port = 9017;
app.listen(port, () => {
    console.log("App started on PORT: ", port);
});
