const express = require('express');
const app = express();

const {
	getAllReport,
	createReport,
	updateReport,
	getOneReport,
	deleteOneReport,
} = require('../controllers/report');

const routes = express.Router();

routes
	.route('/:_id')
	.get(getOneReport)
	.delete(deleteOneReport)
	.patch(updateReport);
routes.route('/').get(getAllReport).post(createReport);

module.exports = routes;
