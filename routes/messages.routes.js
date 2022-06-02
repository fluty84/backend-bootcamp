const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service")
const MessageDB = require('./../models/message.model')

router.get("/", (req, res) => {

    res.json("Hello world")
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
        .saveMessage(destination, body)
        .then(response => {
            console.log(response.data,"dataaa responseeee")
            return MessageDB.create({ destination, message:body, number:parseInt(number)})
        })
        .then(response => res.json(response))
        .catch(err => {
            console.log(err, "errror loggggg.--------------------")
            res.json(err)
            // if (!err.config?.data.includes("destination") && !err.config?.data.includes("body")) {
            //     return res.status(400).json({ message: "Need destination & message keys" })
            // }
            // if (!err.config?.data.includes("destination")) {
            //     return res.status(400).json({ message: "Need destination key string" })
            // }
            // if (!err.config?.data.includes("body")) {
            //     return res.status(400).json({ message: "Need message key string" })
            // }
            // if (err.message?.includes("code 500")) {
            //     return res.status(500).json({ message: "Temporal Server Error" })
            // } else {
             //   return err
            
        })

})


module.exports = router;