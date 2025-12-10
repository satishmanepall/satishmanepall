const Tab = require("../models/tabletIds.model");

exports.updateTabStatus = async (req, res) => {
  try {
    console.log(req.body)
    const { id, event } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // FIND RECORD
    const tab = await Tab.findOne({ TabID:id });

    // CASE 1: ID NOT FOUND → NO UPDATE
    if (!tab) {
      return res.status(404).json({
        message: "Tab not found",
        isTabActive: false,
        id: null,
        page: "/"
      });
    }

    // CASE 2: SESSION REMOVED EVENT
    if (event === "sessionremove") {
      tab.isTabActive = false;
      tab.page = "/";
      await tab.save();

      return res.status(200).json({
        message: "Session Removed → Tab Deactivated",
        isTabActive: false,
        id: tab.TabID,
        page: "/"
      });
    }

    // CASE 3: DEFAULT (ACTIVATE TAB)
    tab.isTabActive = true;
    tab.page = "/auth";
    await tab.save();
    return res.status(200).json({
      message: "Tab Activated",
      isTabActive: true,
      id: tab.TabID,
      page: "/auth"
    });

  } catch (error) {
    console.error("Tab Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getAllTabs = async (req, res) => {
  try {
    // Fetch all records
    const tabs = await Tab.find().sort({ createdAt: -1 });

    if (!tabs || tabs.length === 0) {
      return res.status(404).json({
        message: "No tablet records found",
        data: []
      });
    }

    return res.status(200).json({
      message: "Tablet list fetched successfully",
      total: tabs.length,
      data: tabs
    });

  } catch (error) {
    console.error("Fetch All Tabs Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
