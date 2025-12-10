const SessionService = require('../services/sessionService')
const MachineService = require('../services/machineService')
const crypto = require('crypto');


function generatePassword(length = 12) {
    return crypto.randomBytes(length).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, length)
}
function EditCameraUrlLink(Camera0) {
    const parts = Camera0.split("/")
    return `http://${parts[2]}:1985/rtc/v1/whep/?app=live&stream=${parts[4]}.flv`;
}

exports.CreateSession = async (req, res) => {
    try {
        let sessionId = crypto.randomUUID().replaceAll("-", "");
        let PassWord = generatePassword();
        const Mac_no = await MachineService.lessOccupiedMachine();
        EditCameraUrlLink(Mac_no.CameraUrl)
        const SessionData = {
            sessionID: sessionId,
            sessionPassword: PassWord,
            macNo: Mac_no.mac_no,
            CameraUrl:EditCameraUrlLink(Mac_no.CameraUrl),
            senderName: req.query.sender
        }
        const FixedData = await SessionService.CreateSession(SessionData);
        const SendingData = {
            sessionID: FixedData.sessionID,
            sessionPassword: FixedData.sessionPassword,
            CameraUrl: FixedData.CameraUrl,
            createdTime: FixedData.createdTime
        }
        if (FixedData != null) {
            return res.status(200).json({
                message: "Session id Genarated",
                status:1,
                data: SendingData,
                WebSocketURL:"ws://172.16.10.150:59199/ws"
            })
        }
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
