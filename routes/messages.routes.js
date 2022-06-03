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
        return res.status(400).json({ message: "Need destination key or destination can't be null" })
    }
    if (!body) {
        return res.status(400).json({ message: "Need message key or message can't be null" })
    }
    if (!number) {
        return res.status(400).json({ message: "Need number key or number can't be null" })
    }
    


    MessageAppService
        .sendMessage(destination, body)
        .then(response => {
            
            let status = "Message not sent"

            if(response.status === 200 && response.data === "OK"){
                status = "Message Sent"
            }

            return MessageDB
                .create({ 
                    destination,
                    message: body,
                    number: parseInt(number),
                    status,
                 })
        })
        .then(response => res.status(200).json(response.status))
        .catch(err => {
        
            if (err.status === 504) {
                return MessageDB
                    .create({ 
                        destination, 
                        message: body, 
                        number: parseInt(number), 
                        status: "Message sent but not confirmed"})
                    .then(response => res.status(504).json(response.status))
            }

            if (err.message.includes("code 500")) {

                MessageDB
                    .create({
                        destination,
                        message: body,
                        number: parseInt(number),
                        status: "Message not sent",
                    })
                    .then(response => res.status(500).json(response.status))
                
            } else {

            res.json(err)

            }

        })
})



module.exports = router;