const express=require('express')
const sessionRoutes=require('./sessionRoutes')
const ValidateTid=require("./ValidateRouter")
const GameRecords=require("./gameRoutes")

const router =express.Router()
router.use('/session',sessionRoutes)
router.use('/validate', ValidateTid )
router.use('/gamerecord',GameRecords  )
module.exports = router
