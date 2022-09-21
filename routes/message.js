const express = require('express');
const app = express();

const {
	getAllMessage,
	createMessage,
	updateMessage,
	getOneMessage,
	deleteOneMessage,
} = require('../controllers/message');
const { protected } = require("../middlewares/auth");

const routes = express.Router();

routes.route('/:_id').get(protected, getOneMessage).delete(protected,deleteOneMessage).patch(protected,updateMessage);
routes.route('/').get(protected,getAllMessage).post(createMessage);


module.exports = routes;
