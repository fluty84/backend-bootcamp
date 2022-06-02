const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service")
const MessageDB = require('./../models/message.model')

router.get("/", (req, res) => {

    MessageDB
        .find()
        .then(messages => res.json(messages))
        .catch(err => res.json(err))

})


router.post("/", (req, res) => {

    const { destination, message, number } = req.body

    const body = message

    if (!destination && !body) {
        return res.status(400).json({ message: "Need destination & message keys" })
    }
    if (destination && typeof destination !== "string" || body && typeof body !== "string") {
        return res.status(400).json({ message: "values only can be strings" })
    }
    if (!destination) {
        return res.status(400).json({ message: "Need destination key" })
    }
    if (!body) {
        return res.status(400).json({ message: "Need message key" })
    }


    MessageAppService
        .sendMessage(destination, body)
        .then(response => {
            const status = response.status === 200 && response.data === "OK"
            status ? "Message Sent" : "Message not sent"
            return MessageDB.create({ destination, message: body, number: parseInt(number), status })
        })
        .then(response => res.json(response))
        .catch(err => {
            console.log(err)
            if (err.response.status === 504) {
                return MessageDB
                    .create({ 
                        destination, 
                        message: body, 
                        number: parseInt(number), 
                        status: "Message Sent", 
                        confirmed: false })
                    .then(response => res.status(500).json(`${response.status} but not confirmed`))
            }

            if (err.message.includes("code 500")) {

                MessageDB
                    .create({
                        destination,
                        message: body,
                        number: parseInt(number),
                        sent: "Message not sent",
                        confirmed: false
                    })
                    .then(response => res.status(500).json(response.sent))
                
            } else {

            res.json(err)

            }

        })
})



module.exports = router;