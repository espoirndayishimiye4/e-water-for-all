const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponses');
const Message = require('../models/message');

const getAllMessage = asyncHandler(async (req, res, next) => {
	const message = await Message.find();
	res.status(200).json({
		success: true,
		data: message,
	});
});
const createMessage = asyncHandler(async (req, res, next) => {
	const { name, phone, address, message } = req.body;
	const newMessage = await Message.create({
		name,
		phone,
		address,
		message,
	});
	res.status(201).json({
		success: true,
		data: newMessage,
	});
});

const getOneMessage = asyncHandler(async (req, res, next) => {
	const messageExist = await Message.findById(req.params._id);
	if (!messageExist)
		next(new ErrorResponse(`Message with id ${req.params._id} not exist`, 404));
	else {
		const message = await Message.find({ _id: req.params._id });
		res.status(200).json({
			success: true,
			data: message,
		});
	}
});
const deleteOneMessage = asyncHandler(async (req, res, next) => {
	const messageExist = await User.findById(req.params._id);
	if (!messageExist)
		next(new ErrorResponse(`Message with id ${req.params._id} not exist`, 404));
	else {
		messageExist.remove();
		res.status(200).json({
			success: true,
		});
	}
});
const updateMessage = asyncHandler(async (req, res, next) => {
	const messageExist = await User.findById(req.params._id);
	if (!messageExist)
		next(new ErrorResponse(`Message with id ${req.params._id} not exist`, 404));
	const message = await Message.findByIdAndUpdate(req.params._id, req.body, {
		new: true,
	});
	res.status(200).json({
		success: true,
		data: message,
	});
});
module.exports = {
	getAllMessage,
	createMessage,
	updateMessage,
	getOneMessage,
	deleteOneMessage,
};
