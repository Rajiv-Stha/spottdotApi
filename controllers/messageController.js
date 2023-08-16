const ChatModel = require("../model/chatModel");
const MessageModel = require("../model/messageModel");

class MessageController {
  async addMessage(req, res) {
    const { chatId } = req.body;

    try {
      if (!chatId) {
        throw "Invalid credentails";
      }
      // con
      let message = await MessageModel.create(req.body);
      message = await message.populate("chatId");

      await ChatModel.findByIdAndUpdate(chatId, {
        latestMessage: message._doc._id,
      });

      res.status(200).json({ message: message, success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message, success: false });
    }
  }
  // fetch message of specific chat Id

  async getMessageOfAChat(req, res) {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(500).json({ message: "Invalid", success: false });
    }
    try {
      const messages = await MessageModel.find({ chatId }).populate(["chatId"]);
      res.status(200).json({ message: messages, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }

  async addMessageForNewChat(req, res) {
    console.log(req.body);
    res.status(200).json({ message: "hello", success: true });
  }
}

module.exports = new MessageController();
