module.exports = (io) => {
  // console.log("inside",io)
  let onlineUsers = [];

  function addUser(user) {
    onlineUsers.push(user);
  }

  function getUser(userId) {
    return onlineUsers.find((user) => user.userId === userId);
  }

  function removeUser(userId) {
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    return onlineUsers;
  }
  function removeUesrBySocketId(socketId) {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    return onlineUsers;
  }

  io.on("connection", (socket) => {
    console.log("someone connected");

    socket.on("JOIN", (userId) => {
      if (!getUser(userId)) {
        addUser({
          userId,
          socketId: socket.id,
        });

        // console.log()
      }
      console.log("online", onlineUsers);
      socket.emit("GET_USERS", onlineUsers);
    });

    socket.on("LEAVE", (userId) => {
      if (getUser(userId)) {
        const remaining = removeUser(userId);
        socket.emit("GET_USERS", remaining);
      }
    });

    socket.on("SEND_MESSAGE", (data) => {
      console.log("sending message 1", data);

      const { message, senderId, receiverId } = data;

      const nextUser = getUser(receiverId);
      console.log("next user ", nextUser);

      if (!nextUser) return;
      const newMessage = {
        message,
        senderId,
      };
      console.log("sending message 2 ", newMessage);
      io.to(nextUser.socketId).emit("GET_MESSAGE", newMessage);
    });

    socket.on("disconnect", () => {
      const remainingUsers = removeUesrBySocketId(socket.id);
      socket.emit("GET_USERS", remainingUsers);
      console.log("remaining", remainingUsers);
    });

    // console.log("someone joined ");
  });
};
