const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema)

Message.syncIndexes()

module.exports = Message;
