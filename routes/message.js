const express = require('express');
const app = express();

const {
	getAllMessage,
	createMessage,
	updateMessage,
	getOneMessage,
	deleteOneMessage,
} = require('../controllers/message');

const routes = express.Router();

routes.route('/:_id').get(getOneMessage).delete(deleteOneMessage).patch(updateMessage);
routes.route('/').get(getAllMessage).post(createMessage);


module.exports = routes;
