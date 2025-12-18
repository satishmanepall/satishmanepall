const express = require('express')
const getTodayGameReport= require('../controllers/gameController.js')
const router = express.Router()
router.get("/today-report", getTodayGameReport.getTodayGameReportRecordWise);
// getSession
module.exports = router


