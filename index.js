
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const dbConnect = require('./config/dbConnect');
const app = express();

app.use(express.json())
app.use(cookieParser())

dbConnect();

app.use('/user', require('./routes/user'));
app.use('/message', require('./routes/message'));
app.use('/report', require('./routes/report'));
mongoose.connection.once('open', () => {
	console.log('DB connected');
	app.listen(process.env.PORT || 3500, () => {
		console.log(`server is running on port ${process.env.PORT}`);
	});
});
