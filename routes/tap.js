const express = require("express");
const app = express;

const { createTap, getAllTap, getOneTap, updateTap, deleteOneTap,} = require("../controllers/tap");
const routes = express.Router();

routes
    .route("/:_id")
    .get(getOneTap)
    .delete(deleteOneTap)
    .patch(updateTap);
routes
    .route("/")
    .get( getAllTap)
    .post( createTap)

module.exports = routes;