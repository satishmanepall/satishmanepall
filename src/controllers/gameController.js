const GameRecord=require("../models/gameSessions.model")
exports.getTodayGameReportRecordWise = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const report = await GameRecord.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfToday,
            $lte: endOfToday
          }
        }
      },
      {
        $project: {
          gameId: 1,
          TabletId: 1,
          results: 1,
          createdAt: 1,

          winCount: {
            $size: {
              $filter: {
                input: "$results",
                as: "r",
                cond: { $eq: ["$$r.gameStatus", "win"] }
              }
            }
          },

          loseCount: {
            $size: {
              $filter: {
                input: "$results",
                as: "r",
                cond: { $eq: ["$$r.gameStatus", "lose"] }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          records: { $push: "$$ROOT" },
          totalWin: { $sum: "$winCount" },
          totalLose: { $sum: "$loseCount" }
        }
      }
    ]);

    const result = report[0] || {
      records: [],
      totalWin: 0,
      totalLose: 0
    };

    res.json({
      success: true,
      date: startOfToday.toISOString().slice(0, 10),

      summary: {
        totalGames: result.totalWin + result.totalLose,
        win: result.totalWin,
        lose: result.totalLose
      },

      records: result.records
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
