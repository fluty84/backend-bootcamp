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
        .catch(err => {
            
            if(!err.config.data.includes("destination") && !err.config.data.includes("body") ){
               return res.status(427).json({message:"Need destination & message keys"})
            }
            if(!err.config.data.includes("destination")){
               return res.status(428).json({message:"Need destination key"})
            }
            if(!err.config.data.includes("body")){
               return res.status(429).json({message:"Need message key"})
            }

            if(err.message.includes("code 500")){
                return res.status(500).json({message:"Temporal Server Error"})
            }
            else{

            res.status(450).json(err)
        }
        })

})


module.exports = router;