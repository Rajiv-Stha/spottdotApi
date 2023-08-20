const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    text: String,
    sender: {},
    type:String,
    url:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
