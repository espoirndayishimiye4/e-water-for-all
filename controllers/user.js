const bcrypt = require("bcrypt");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponses");
const User = require("../models/user");

const getAllUser = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    data: user,
  });
});
const createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, address, role } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    address,
    role
  });
  //sendTokenResponse(user, 200, req, res);
  const token = user.getSignedJWTToken();
  res.status(201).json({
    success: true,
    token
  })
});

const getOneUser = asyncHandler(async (req, res, next) => {
  const isuserExist = await User.findById(req.params._id);
  if (!isuserExist)
    next(new ErrorResponse(`user with id ${req.params._id} not exist`, 404));
  else {
    const user = await User.find({ _id: req.params._id });
    res.status(200).json({
      success: true,
      data: user,
    });
  }
});
const deleteOneUser = asyncHandler(async (req, res, next) => {
  const isuserExist = await User.findById(req.params._id);
  if (!isuserExist)
    next(new ErrorResponse(`user with id ${req.params._id} not exist`, 404));
  else {
    isuserExist.remove();
    res.status(200).json({
      success: true,
    });
  }
});
const updateUser = asyncHandler(async (req, res, next) => {
  const isuserExist = await User.findById(req.params._id);
  if (!isuserExist)
    next(new ErrorResponse(`user with id ${req.params._id} not exist`, 404));
  const user = await User.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide email and password`, 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`credentials are not correct`, 401));
  }
  const valid = await user.matchPassword(password);
  if (!valid) {
    return next(new ErrorResponse(`credentials are not correct`, 401));
  }
  sendTokenResponse(user, 200, req, res);
});

// const sendResponse = (user, statusCode, res) => {
//   const token = user.getSignedJWTToken();
//   const option = {
//     expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };

//   res.status(statusCode).cookie("token", token, option).json({
//     success: true,
//     token,
//   });
// };

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, req, res) => {
  // Create token
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};
module.exports = {
  getAllUser,
  createUser,
  getOneUser,
  deleteOneUser,
  updateUser,
  login,
};
