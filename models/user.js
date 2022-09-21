const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide first name"],
  },
  address: {
    type: String,
    required: [true, "please address"],
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
  role: {
    type: String,
    default: 'agent',
    enum: ["admin", "provider", "agent"],
    
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

