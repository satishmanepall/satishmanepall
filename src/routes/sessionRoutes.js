const express =require('express')
const sessionController=require('../controllers/sessionControllers')
const router=express.Router();
const {authMiddleware}=require('../middleware/authMiddleware')

router.post('/create',authMiddleware,sessionController.CreateSession)

module.exports = router