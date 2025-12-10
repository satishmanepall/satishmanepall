const mongoose = require('mongoose');

const TabSchema = new mongoose.Schema({
  TabID: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isTabActive: {
    type: Boolean,
    default: false,
  },
  page:{
    type:String,
    default: "/",
  }
}, { timestamps: true });

module.exports = mongoose.model('tbl_tab', TabSchema, 'tbl_tabs');
