const { createChatForFirstMessage } = require("../controllers/ChatController");
const {
  addMessage,
  getMessageOfAChat,
  deleteMessage,
} = require("../controllers/MessageController");

const router = require("express").Router();

router.post("/create", addMessage);
router.post("/new_message", createChatForFirstMessage, addMessage);
router.get("/:chatId", getMessageOfAChat);
router.delete("/:msgId", deleteMessage);

module.exports = router;
