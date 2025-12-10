const express = require('express')
const { updateTabStatus, getAllTabs } = require('../controllers/ValidateController')
const { createGameSession, updateGameResult, getGameSession } = require('../services/gamesessions')
const router = express.Router()
router.post('/Tid', updateTabStatus)
router.get('/getTabletIds', getAllTabs)
router.post('/createSession', createGameSession)
router.post('/updateSession', updateGameResult)
router.post('/getSession', getGameSession)

// getSession
module.exports = router

