const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            
        },
        message: {
            type: String,
            
        },
        number: {
            type: Number,
           
        },
        
        status: {
            type: String, 
            enum: ["Message Sent", "Message not sent", "Message sent but not confirmed"],
            default: "Message Sent" 
        } 
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema)

Message.syncIndexes()

module.exports = Message;
