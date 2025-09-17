const mongoose = require('mongoose')

const machineSchema = new mongoose.Schema({
  machine_type: {
    id: { type: String, required: true },
    descr: { type: String, default: '' }, // Default to empty string
    name: { type: String, required: true },
    img_file: { type: String, required: true },
    machine_type_number: { type: Number, required: true },
  },
  claw_settings: {
    id: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    move_during: {
      type: Number,
      required: true,
    },
    num3clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num4clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num5clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num6clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num7clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num8clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num9clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num10clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num11clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
  },
  claw_settings_win:[ {
    id: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    move_during: {
      type: Number,
      required: true,
    },
    num3clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num4clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num5clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num6clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num7clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num8clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num9clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num10clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num11clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
  }],
  claw_settings_loss:[{
    id: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    move_during: {
      type: Number,
      required: true,
    },
    num3clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num4clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num5clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num6clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num7clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num8clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num9clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num10clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
    num11clawforce: {
      type: Number,
      default: 0, // Default to 0
    },
  }],
  gifts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'gifts',
      required: true,
    },
  ],
  mac_no: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  demo: {
    type: Boolean,
    default: false, // Default to false
  },
  camera0: {
    type: String, // URL
    required: true,
  },
  camera1: {
    type: String, // URL
    default: '', // Default to empty string
  },
  sort_order: {
    type: Number,
    default: 0,
  },
  mac_status: {
    type: Number
  },
  is_active: {
    type: Boolean,
    default: true, // Default to true
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  net_status: {
    type: Number
  },
  duration: {
    type: Number,
    default: 0, // Default to 0
  },
  maintanence_mode: {
    type: Boolean,
    default: true, // Default to true
  },
  platform_profitability: {
    type: Number,
    default: 0, // Default to 0
  },
  err_status: {
    type: Number
  },
  created_by_user: {
    id: { type: String, default: '' }, // Default to empty string
    user_name: { type: String, default: '' }, // Default to empty string
  },
  created_time: {
    type: Date,
    default: Date.now, // Default to current time
  },
  created_by_ip: {
    type: String,
    default: '', // Default to empty string
  },
  created_by_user_agent: {
    type: String,
    default: '', // Default to empty string
  },
  updated_by_user: {
    id: { type: String, default: '' }, // Default to empty string
    user_name: { type: String, default: '' }, // Default to empty string
  },
  updated_time: {
    type: Date,
    default: Date.now, // Default to current time
  },
  updated_by_ip: {
    type: String,
    default: '', // Default to empty string
  },
  updated_by_user_agent: {
    type: String,
    default: '', // Default to empty string
  },
  QueueSize:{
  type:Number
  }
})

// Indexes
//machineSchema.index({ mac_no: 1 })

module.exports = mongoose.model('tbl_machines', machineSchema)
