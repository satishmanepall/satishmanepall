const { Server } = require("socket.io");
const Tab = require("../models/tabletIds.model");  // Import DB model

let io;

function init(server) {
  io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Tablet trying to join its room
    socket.on("joinTabletRoom", async (TabletId) => {
      try {
        if (!TabletId) {
          console.log("TabletId missing. Rejecting socket.");
          socket.emit("joinError", { message: "TabletId is required" });
          return;
        }

        // Check if TabletId exists in DB
        const tab = await Tab.findOne({ TabID: TabletId });

        if (!tab) {
          console.log(`TabletId ${TabletId} NOT found. Join denied.`);
          socket.emit("joinError", { message: "Invalid TabletId" });
          return;  // do NOT join the room
        }

        if (tab.isActive === false) {
          console.log(`TabletId ${TabletId} is inactive.`);
          socket.emit("joinError", { message: "Tablet is inactive" });
          return;
        }

        // Otherwise join the room
        socket.join(TabletId);
        console.log(`Tablet ${TabletId} joined room successfully`);

        socket.emit("joinSuccess", {
          message: "Joined tablet room successfully",
          room: TabletId
        });

      } catch (err) {
        console.log("Room join error:", err);
        socket.emit("joinError", { message: "Server error while joining room" });
      }
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { init, getIO };
