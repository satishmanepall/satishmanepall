const GameSession = require("../models/gameSessions.model");
const { getIO } = require("../controllers/socket");  // Import Socket.IO instance

// =========================================================
// Generate Unique Game ID
// =========================================================
const generateGameId = () => {
  return "G" + Math.floor(100000 + Math.random() * 900000);
};

// =========================================================
// 1️⃣ CREATE NEW GAME SESSION
// =========================================================
exports.createGameSession = async (req, res) => {
  try {
    const { sessionId, TabletId, page, totalGames, cost } = req.body;

    if (!TabletId) {
      return res.status(400).json({ message: "TabletId is required" });
    }

    const gameId = generateGameId();
    const io = getIO();

    const session = await GameSession.create({
      gameId,
      sessionId: sessionId || null,
      TabletId,
      page: page || "/auth",
      totalGames: totalGames ?? 10,
      cost: cost ?? 0,
      usedGames: 0,
      results: []
    });
    console.log(  "New game started",
      gameId,
      sessionId,
      TabletId,
       "/auth",
      session.totalGames,"ccccccccccccccccccc")
    // 🔥 Notify Tablet via socket
    io.to(TabletId).emit("gameStart", {
      message: "New game started",
      gameId,
      sessionId,
      TabletId,
      page: "/auth",
      totalGames: session.totalGames,
      remainingGames:session.totalGames
    });

    return res.status(200).json({
      message: "Game session created",
      gameId,
      data: session
    });

  } catch (error) {
    console.error("Create Game Session Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =========================================================
// 2️⃣ UPDATE GAME RESULT + NAVIGATION LOGIC
// =========================================================
exports.updateGameResult = async (req, res) => {
  try {
    const { gameId, TabletId, sessionId, gameStatus } = req.body;

    if (!gameId) return res.status(400).json({ message: "gameId is required" });
    if (!TabletId) return res.status(400).json({ message: "TabletId is required" });
    if (!sessionId) return res.status(400).json({ message: "sessionId is required" });
    if (!gameStatus) return res.status(400).json({ message: "gameStatus is required" });

    const session = await GameSession.findOne({ gameId, TabletId });
    console.log(session,"session is not definedsession is not definedsession is not defined")
    // if (!session) {
    //   return res.status(404).json({ 
    //     message: "Game session not found or sessionId mismatch" 
    //   });
    // }

    // AUTO-GENERATE GAME NUMBER
    const nextGameNo = session.usedGames + 1;

    // Save result
    session.results.push({
      gameStatus,
      gameNo: nextGameNo,
    });

    // Update count
    session.usedGames = nextGameNo;
    session.sessionId = sessionId

    const remainingGames = session.totalGames - session.usedGames;

    // STOP CASE — No more games left
    if (remainingGames <= 0) {
      session.page = "/auth";
      await session.save();

      return res.status(200).json({
        message: "Game limit reached — Game stopped",
        usedGames: session.usedGames,
        totalGames: session.totalGames,
        remainingGames: 0,
        page: "/auth"

      });
    }

    // CONTINUE CASE — Games remaining
    session.page = "/auth";
    await session.save();

    return res.status(200).json({
      message: "Game updated",
      usedGames: session.usedGames,
      totalGames: session.totalGames,
      remainingGames,
      nextGameNo,
      page: "/auth"
    });

  } catch (error) {
    console.error("Update Game Error:", error);
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};


// =========================================================
// 3️⃣ GET LIVE GAME SESSION DATA
// =========================================================
exports.getGameSession = async (req, res) => {
  try {
    const { gameId, TabletId } = req.body;

    if (!gameId) return res.status(400).json({ message: "gameId required" });
    if (!TabletId) return res.status(400).json({ message: "TabletId required" });

    const session = await GameSession.findOne({ gameId, TabletId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.status(200).json({
      message: "Game session fetched",
      data: session
    });

  } catch (error) {
    console.error("Get Game Session Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
