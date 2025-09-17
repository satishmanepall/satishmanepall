const Machine = require('../models/machineModel')


exports.lessOccupiedMachine = async () => {
    const MachineNoList = await Machine.aggregate([
  {
    $match: {
      err_status: 0,
      net_status: 1,
      mac_status: 1
    }
  },
  {
    $group: {
      _id: "$QueueSize",
      devices: {
        $push: {
          mac_no: "$mac_no",
          CameraUrl: "$camera0"
        }
      }
    }
  },

  { $sort: { _id: 1 } },
  { $limit: 1 }
])

    if (MachineNoList != null) {
        console.log(MachineNoList)
        const list = MachineNoList[0].devices;
        const randomElement = list[Math.floor(Math.random() * list.length)];
        console.log(randomElement);
        return randomElement;
    }
}