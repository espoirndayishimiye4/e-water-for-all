const express = require("express");
const app = express();

const {
  getAllReport,
  createReport,
  updateReport,
  getOneReport,
  deleteOneReport,
} = require("../controllers/report");
const { protected } = require("../middlewares/auth");

const routes = express.Router();

routes
  .route("/:_id")
  .get(protected, getOneReport)
  .delete(protected, deleteOneReport)
  .patch(protected, updateReport);
routes.route("/").get(protected, getAllReport).post(protected, createReport);

module.exports = routes;
