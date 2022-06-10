
import { Message } from "../models/message.js"

export default (req, res) => {
    
    const { messageId } = req.params 

    Message
        .find({taskId:messageId}, "status")
        .then( response => res.json(response))

}