const { toolresults_v1beta3 } = require('googleapis');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    //balance operation
    depositBalance: {
      type: Number,
      default: 0,
    },
    withdrawBalance: {
      type: Number,
      default: 0,
    },
    bonusBalance: {
      type: Number,
      default: 0,
    },
    commissionBalance: {
      type: Number,
      default: 0,
    },
    // user options
    userCreditBalance: {
      type: Number,
      default: 0,
    },
    usersWB: {
      type: Number,
      default: 0,
    },
    // lottery options
    totalLottery: {
      type: Number,
      default: 0,
    },
    lotterySold: {
      type: Number,
      default: 0,
    },
    lotteryPrize: {
      type: Number,
      default: 0,
    },
    lotteryProfit: {
      type: Number,
      default: 0,
    },
    totalDraw: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
