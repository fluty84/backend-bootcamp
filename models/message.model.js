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
        
        status: Boolean,
        
        sent: {
            type:"string", 
            enum: ["Message Sent", "Message not sent"],
            default: "Message not sent" 
        }, 
        confirmed: Boolean
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema)

Message.syncIndexes()

module.exports = Message;
