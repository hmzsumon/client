const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { type } = require('os');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please enter your username'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      minLength: [10, 'Phone number should have 10 characters'],
      maxLength: [14, 'Phone number should have 10 characters'],
      required: [true, 'Please Enter Your Phone Number'],
      trim: true,
    },
    firstName: {
      type: String,

      trim: true,
    },
    lastName: {
      type: String,

      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
      required: [true, 'Please enter your full name'],
    },

    // address

    country: {
      type: String,
      trim: true,
    },
    address: {
      type: String,

      trim: true,
    },
    city: {
      type: String,

      trim: true,
    },
    state: {
      type: String,

      trim: true,
    },
    zip: {
      type: String,

      trim: true,
    },

    // social links
    facebook: {
      type: String,
      trim: true,
    },

    six_digit_pin: {
      type: Number,
      length: [6, 'Pin should be 6 digits'],
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'superAdmin', 'agent'],
    },

    // all balances
    creditBalance: {
      type: Number,
      default: 0,
    },
    withdrawalBalance: {
      type: Number,
      default: 0,
    },

    bonusBalance: {
      type: Number,
      default: 0,
    },

    incomeBalance: {
      type: Number,
      default: 0,
    },

    dailyIncomeBalance: {
      type: Number,
      default: 0,
    },
    // bonus balance
    referralBonus: {
      type: Number,
      default: 0,
    },
    firstGenBonus: {
      type: Number,
      default: 0,
    },
    secondGenBonus: {
      type: Number,
      default: 0,
    },

    // agent options
    agentName: {
      type: String,
      trim: true,
    },

    agentOwner: {
      type: String,
      trim: true,
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
    // agent bikas, roket, nogad numbers
    paymentMethods: [
      {
        method: {
          type: String,
          enum: ['bikash', 'rocket', 'nagad'],
        },
        methodNumber: {
          type: String,
          trim: true,
        },
      },
    ],
    agentBalance: {
      type: Number,
    },
    agentCommission: {
      type: Number,
    },
    agentWB: {
      type: Number,
    },

    // referral bonus
    referCode: {
      type: String,
    },
    sponsorBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sponsorName: {
      type: String,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    totalMembers: {
      type: Number,
      default: 0,
    },

    // verification options

    emailVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'inactive',
      enum: ['active', 'inactive', 'suspended', 'terminated'],
    },
    // active date
    activeDate: {
      type: Date,
    },
    addressVerified: {
      type: Boolean,
      default: false,
    },

    sponsorBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    nidNumber: {
      type: String,
      trim: true,
    },

    nidImage: {
      nid_number: {
        type: String,
      },
      nidFront: {
        type: String,
        image_url: {
          type: String,
        },
      },
      nidBack: {
        type: String,
        image_url: {
          type: String,
        },
      },
    },

    isNewUser: {
      type: Boolean,
      default: true,
    },
    tasksLimit: {
      type: Number,
      default: 0,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // package
    userHasPackage: {
      type: Boolean,
      default: false,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    packageName: {
      type: String,
    },
    packageStartDate: {
      type: Date,
    },
    packageEndDate: {
      type: Date,
    },
    packageTaskLimit: {
      type: Number,
      default: 0,
    },
    usrTaskValue: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },

    //
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
