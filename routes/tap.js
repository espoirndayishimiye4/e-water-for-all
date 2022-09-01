const express = require("express");
const app = express;

const { createTap, getAllTap, getOneTap, updateTap, deleteOneTap,} = require("../controllers/tap");
const { protected } = require("../middlewares/auth");
const routes = express.Router();

routes
    .route("/:_id")
    .get(protected,getOneTap)
    .delete(protected,deleteOneTap)
    .patch(protected,updateTap);
routes
    .route("/")
    .get(protected,getAllTap)
    .post(protected,createTap)

module.exports = routes;