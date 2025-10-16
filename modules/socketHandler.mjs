let votes = { optionA: 0, optionB: 0 };

export function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Send current votes to new user
    socket.emit("updateVotes", votes);

    // Handle incoming votes
    socket.on("vote", (option) => {
      if (votes[option] !== undefined) {
        votes[option]++;
        // Broadcast updated votes to everyone
        io.emit("updateVotes", votes);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}
