const express=require('express')
const sessionRoutes=require('./sessionRoutes')

const router =express.Router()
router.use('/session',sessionRoutes)

module.exports = router