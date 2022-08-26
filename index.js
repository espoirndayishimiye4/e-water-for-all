const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = require("./config/dbConnect");
const app = express();

app.use(express.json())

dbConnect();
app.get("/", (req, res) => {
  res.send('e-water-for-all')
});

app.use('/user', require('./routes/user'))

mongoose.connection.once('open', ()=>{
  console.log('DB connected')
  app.listen(process.env.PORT || 3500,()=>{console.log(`server is running on port ${process.env.PORT}`)})
})
