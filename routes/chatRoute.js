const {
  createChat,
  getChatOfUser,
  getChatById,
  getChatByBothUsers,
  deleteChat,
} = require("../controllers/ChatController");
const router = require("express").Router();

router.post("/create", createChat);
router.get("/:userId", getChatOfUser);
router.get("/byUsersId/:senderId/:receiverId", getChatByBothUsers);
router.get("/byChatId/:chatId", getChatById);
router.delete("/:chatId", deleteChat);
module.exports = router;
