const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a BinaryTree schema
const placementSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
    },
    firstGen: [
      {
        type: String,
      },
    ],
    secondGen: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);

const Placement = mongoose.model('Placement', placementSchema);
module.exports = Placement;
