const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please provide first name"],
  },
  lastName: {
    type: String,
    required: [true, "please provide last name"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
    select: false,
  },
  address: {
    type: String,
    required: [true, "please address"],
  },
  role: {
    type: String,
    enum: ["admin", "provider", "agent"],
    required: [true, "please provide user role"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});
userSchema.methods.getSignedJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
  }

const user = mongoose.model("user", userSchema);

module.exports = user;

