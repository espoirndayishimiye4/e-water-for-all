const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponses');
const Report = require('../models/report');

const getAllReport = asyncHandler(async (req, res, next) => {
	const report = await Report.find();
	res.status(200).json({
		success: true,
		data: report,
	});
});
const createReport = asyncHandler(async (req, res, next) => {
	const { agentId, message, status } = req.body;
	const newReport = await Report.create({
		agentId,
		message,
		status,
	});
	res.status(201).json({
		success: true,
		data: newReport,
	});
});

const getOneReport = asyncHandler(async (req, res, next) => {
	const reportExist = await Report.findById(req.params._id);
	if (!reportExist)
		next(new ErrorResponse(`Report with id ${req.params._id} not exist`, 404));
	else {
		const report = await Report.find({ _id: req.params._id });
		res.status(200).json({
			success: true,
			data: report,
		});
	}
});
const deleteOneReport = asyncHandler(async (req, res, next) => {
	const reportExist = await Report.findById(req.params._id);
	if (!reportExist)
		next(new ErrorResponse(`Report with id ${req.params._id} not exist`, 404));
	else {
		reportExist.remove();
		res.status(200).json({
			success: true,
		});
	}
});
const updateReport = asyncHandler(async (req, res, next) => {
	const reportExist = await Report.findById(req.params._id);
	if (!reportExist)
		next(new ErrorResponse(`Report with id ${req.params._id} not exist`, 404));
	const report = await Report.findByIdAndUpdate(req.params._id, req.body, {
		new: true,
	});
	res.status(200).json({
		success: true,
		data: report,
	});
});
module.exports = {
	getAllReport,
	createReport,
	updateReport,
	getOneReport,
	deleteOneReport,
};
