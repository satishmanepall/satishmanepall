const Session = require('../models/sessionModel')

exports.CreateSession=async(SessionData)=>{
    const SessionTemp=new Session(SessionData)
    return await SessionTemp.save()
}