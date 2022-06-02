const router = require("express").Router();
const MessageAppService = require("../services/messageapp.service")

router.get("/", (req, res) => {

    res.json("Hello world")
})


router.post("/", (req, res) => {
    
    const { destination, message } = req.body

    const body = message

    if (!destination && !body) {
        return res.status(400).json({ message: "Need destination & message keys" })
    }
    if (typeof destination !== "string" || typeof body !== "string"){
        return res.status(400).json({message: "values only can be strings"})
    }
    if(!destination){
        return res.status(400).json({ message: "Need destination key" })
    }
    if(!body){
        return res.status(400).json({ message: "Need message key" })
    }


    MessageAppService
        .saveMessage(destination, body)
        .then(response => res.json(response.data))
        .catch(err => {
            
            if(!err.config.data.includes("destination") && !err.config.data.includes("body") ){
               return res.status(400).json({message:"Need destination & message keys"})
            }
            if(!err.config.data.includes("destination")){
               return res.status(400).json({message:"Need destination key string"})
            }
            if(!err.config.data.includes("body")){
               return res.status(400).json({message:"Need message key string"})
            }
            if(err.message.includes("code 500")){
                return res.status(500).json({message:"Temporal Server Error"})
            } else {
                return err
            }
    
        })
    
       

})


module.exports = router;