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
  .get(protected,authorize('admin', 'provider'),getOneUser)
  .delete(protected,authorize('admin', 'provider'),deleteOneUser)
  .patch(protected,authorize('admin', 'provider'),updateUser);
routes
  .route("/")
  .get(protected,authorize('admin', 'provider'), getAllUser)
  .post( protected,authorize('admin', 'provider'), createUser);

routes.route("/login").post(login);
routes.route("/user/logout").get(protected,authorize('admin', 'provider'),logout);

module.exports = routes;
