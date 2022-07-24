const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        'Gold',
        'Silver',
        'Bronze',
        'Platinum',
        'Diamond',
        'VIP-01',
        'VIP-02',
        'VIP-03',
        'VIP-04',
        'VIP-05',
        'VIP-06',
        'VIP-07',
        'VIP-08',
        'VIP-09',
        'VIP-10',
      ],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // users length
    usersLength: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    cashback: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    dailyProfit: {
      type: Number,
    },
    duration: {
      type: Number,
      required: true,
    },
    packageTaskValue: {
      type: Number,
    },
    // tasks limit
    tasksLimit: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
