const mongoose = require("mongoose");

const globalChatsSchema = mongoose.Schema({
    globalChatsName: {
        type: String
    },
    roomId: {
        type: String
    },
    authorName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            sender: {
                type: String
            },
            message: {
                type: String
            }
        }
    ]
})

globalChatsSchema.methods.saveMessage = async function (message, sender) {
    this.messages = [...this.messages, { sender, message }];
    await this.save();
}

const GlobalChats = mongoose.model("Global_chat", globalChatsSchema);
module.exports = GlobalChats;