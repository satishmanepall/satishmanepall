// const SessionService = require('../services/sessionService')
// const MachineService = require('../services/machineService')
// const crypto = require('crypto');


// function generatePassword(length = 12) {
//     return crypto.randomBytes(length).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, length)
// }
// function EditCameraUrlLink(Camera0) {
//     const parts = Camera0.split("/")
//     return `http://${parts[2]}:1985/rtc/v1/whep/?app=live&stream=${parts[4]}.flv`;
// }

// exports.CreateSession = async (req, res) => {
//     try {
//         let sessionId = crypto.randomUUID().replaceAll("-", "");
//         let PassWord = generatePassword();
//         const Mac_no = await MachineService.lessOccupiedMachine();
//         EditCameraUrlLink(Mac_no.CameraUrl)
//         const SessionData = {
//             sessionID: sessionId,
//             sessionPassword: PassWord,
//             macNo: Mac_no.mac_no,
//             CameraUrl:EditCameraUrlLink(Mac_no.CameraUrl),
//             senderName: req.query.sender
//         }
//         const FixedData = await SessionService.CreateSession(SessionData);
//         const SendingData = {
//             sessionID: FixedData.sessionID,
//             sessionPassword: FixedData.sessionPassword,
//             CameraUrl: FixedData.CameraUrl,
//             createdTime: FixedData.createdTime
//         }
//         if (FixedData != null) {
//             return res.status(200).json({
//                 message: "Session id Genarated",
//                 status:1,
//                 data: SendingData,
//                 WebSocketURL:"ws://172.16.10.150:59199/ws"
//             })
//         }
//     }
//     catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// }





const SessionService = require('../services/sessionService');
const Machine = require("../models/machineModel");
const Tab = require("../models/tabletIds.model");
const crypto = require('crypto');

function generatePassword(length = 12) {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, length);
}

function EditCameraUrlLink(Camera0) {
  const parts = Camera0.split("/");
  return `http://${parts[2]}/rtc/v1/whep/?app=live&stream=${parts[4]}.flv`;
}

exports.CreateSession = async (req, res) => {
  try {
    const { tab_no } = req.body;   // 👈 TAB NO FROM FRONTEND

    if (!tab_no) {
      return res.status(400).json({
        status: 0,
        message: "tab_no is required",
      });
    }

    // 1️⃣ Find TAB → MAC mapping
    const tab = await Tab.findOne({TabID:tab_no });

    if (!tab) {
      return res.status(404).json({
        status: 0,
        message: "TAB not registered",
      });
    }

    // 2️⃣ Validate MACHINE health using MAC
    const machine = await Machine.findOne({
      mac_no: tab.macId,
      err_status: 0,
      net_status: 1,
      mac_status: 1,
    });

    if (!machine) {
      return res.status(404).json({
        status: 0,
        message: "Machine is offline or in error state",
      });
    }

    // 3️⃣ Create session details
    const sessionId = crypto.randomUUID().replaceAll("-", "");
    const PassWord = generatePassword();

    const SessionData = {
      sessionID: sessionId,
      sessionPassword: PassWord,
      macNo: machine.mac_no,
      CameraUrl: EditCameraUrlLink(machine.camera0),
      senderName: req.query.sender,
    };

    // 4️⃣ Save session
    const FixedData = await SessionService.CreateSession(SessionData);

    if (!FixedData) {
      return res.status(400).json({
        status: 0,
        message: "Session creation failed",
      });
    }

    // 5️⃣ Response to frontend
    return res.status(200).json({
      message: "Session id Generated",
      status: 1,
      data: {
        sessionID: FixedData.sessionID,
        sessionPassword: FixedData.sessionPassword,
        CameraUrl: FixedData.CameraUrl,
        createdTime: FixedData.createdTime,
      },
      WebSocketURL: "wss://socket.lucratechsol.com/ws",
    });

  } catch (error) {
    return res.status(500).json({
      status: 0,
      error: error.message,
    });
  }
};

