const express = require("express");
const app = express();

const {
  getAllUser,
  createUser,
  getOneUser,
  deleteOneUser,
  updateUser,
  login,
} = require("../controllers/user");
const { protected, authorize, logout } = require("../middlewares/auth");
const routes = express.Router();

routes
  .route("/:_id")
  .get(getOneUser)
  .delete(deleteOneUser)
  .patch(updateUser);
routes
  .route("/")
  .get( getAllUser)
  .post( createUser);

routes.route("/login").post(login);
routes.route("/user/logout").get(logout);

module.exports = routes;
