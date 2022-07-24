const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyWorkSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    earning: {
      type: Number,
      required: true,
      default: 0,
    },
    isVisited: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const DailyWork = mongoose.model('DailyWork', dailyWorkSchema);
module.exports = DailyWork;
