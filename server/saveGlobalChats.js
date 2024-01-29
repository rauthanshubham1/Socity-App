const GlobalChats = require("./models/globalChatsSchema");

async function saveGlobalChats(message, sender, roomId) {
    if (!message || !sender || !roomId) {
        return;
    }

    const globalChat = await GlobalChats.findOne({ roomId });
    // console.log(globalChat);

    await globalChat.saveMessage(message, sender);

}

module.exports = saveGlobalChats;