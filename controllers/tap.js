
const bcrypt = require("bcrypt");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponses");
const Tap = require("../models/tap");


// CREATE TAP
const createTap = asyncHandler(async(req,res,next) =>{
    const{ agentId, name, status, address } = req.body;
    const tap = await Tap.create({
        agentId,
        name,
        address,
    });

    res.status(201).json({
        success: true,
        data: tap
    })
});

// RETRIEVE ALL TAP
const getAllTap = asyncHandler(async (req, res, next) => {
    const tap = await Tap.find();
    res.status(200).json({
        success: true,
        data: tap,
    });
}); 

// RETRIEVE ONE TAP
const getOneTap = asyncHandler(async(req, res, next) => {
    const isTapExist = await Tap.findById(req.params._id);
    if(!isTapExist) {
        next(new ErrorResponse( `tap with id ${req.params._id} doesn't exist`, 404));
    }
    else {
        const tap = await Tap.find({ _id: req.params._id });
        res.status(200).json({
            success: true,
            data: tap,
        });
    }
});

// DELETE ONE TAP
const deleteOneTap = asyncHandler(async(req, res, next) =>{
    const isTapExist = await Tap.findById(req.params._id);
    if (!isTapExist) {
        next(new ErrorResponse( `tap with id ${req.params._id} doesn't exist`, 404));
    }
    else{
        isTapExist.remove();
        res.status(200).json({
            success: true,
        });
    }
});

// UPDATING ONE TAP
const updateTap = asyncHandler(async(req, res, next) => {
    const isTapExist = await Tap.findById(req.params._id);
    if (!isTapExist) {
        next(new ErrorResponse( `tap with id ${req.params._id} doesn't exist`));
    }
    const tap = await Tap.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
    });
    res.status(200).json({
        success: true,
        data: tap,
    });
});

module.exports = {
    createTap,
    getAllTap,
    getOneTap,
    updateTap,
    deleteOneTap,
};