const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service")

router.get("/", (req, res) => {

    res.json("Hello world")
})


router.post("/", (req, res) => {
    
    const { destination, message } = req.body

    const body = message

    MessageAppService
        .saveMessage(destination, body)
        .then(response => res.json(response.data))
        .catch(err => res.json(err))

})


module.exports = router;