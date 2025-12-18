const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  gameStatus: { type: String, enum: ["won", "lose"], required: true },
  gameNo: { type: Number, required: true },
  veidoUrl:{type: String,default: null },
  thumbnailUrl:{type: String,default: null},
  Machine_id:{type: String,default: null},
  sessionId: { type: String, default: null },
  gameId:{}
},{ timestamps: true });

const GameSessionSchema = new mongoose.Schema({
  gameId: { type: String, unique: true, required: true },
  TabletId: { type: String, required: true },
  page: { type: String, default: "/playzone" },
  totalGames: { type: Number, default: 10 },
  usedGames: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  results: [ResultSchema]
}, { timestamps: true });

module.exports = mongoose.model("GameSession", GameSessionSchema);
