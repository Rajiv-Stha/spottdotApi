const ChatModel = require("../model/chatModel");

class ChatController {
  async createChat(req, res) {
    console.log("inside chat ");
    try {
      const chat = await ChatModel.create(req.body);
      res.status(200).json({ message: chat, success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message, success: false });
    }
  }
  async getChatOfUser(req, res) {
    const { userId } = req.params;
    console.log("inside");
    if (!userId)
      return res
        .status(401)
        .json({ message: "something went wrong", success: false });
    try {
      const chat = await ChatModel.find({
        "users.id": { $in: [userId] },
      })
        .sort({ updatedAt: -1 })
        .populate(["latestMessage"]);
      res.status(200).json({ message: chat, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }
  async getChatById(req, res) {
    const { chatId } = req.params;

    try {
      const chat = await ChatModel.findById(chatId).populate(["latestMessage"]);
      return res.status(200).json({ message: chat, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }
  async getChatByBothUsers(req, res) {
    const { senderId, receiverId } = req.params;
    const users = [senderId, receiverId];
    try {
      let chat = await ChatModel.findOne({
        users: { $all: users },
      }).populate(["latestMessage"]);
      return res.status(200).json({ message: chat, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }
  async createChatForFirstMessage(req, res, next) {
    const { users } = req.body;
    try {
      const chat = await ChatModel.create({
        users,
      });
      req.body.chatId = chat._doc._id.toString();
      next();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteChat(req, res) {
    try {
      await ChatModel.findByIdAndDelete(req.params.chatId);
      res.status(200).json({ message: "successfully Deleted", success: true });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ChatController();
