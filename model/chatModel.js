const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    users: [{}],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema);
