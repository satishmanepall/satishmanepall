const express=require('express')
const sessionRoutes=require('./sessionRoutes')
const ValidateTid=require("./ValidateRouter")
const router =express.Router()
router.use('/session',sessionRoutes)
router.use('/validate', ValidateTid )

module.exports = router
