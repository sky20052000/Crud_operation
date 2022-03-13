const config = require("./config.json");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//db connection
mongoose.connect(config.MONGO_URL).then((data)=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("no connection");
});

// configration 
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// routes
app.use("/api/userRoutes", require("./routes/userRoutes"));

const port = config.PORT || 8002 ;
app.listen(port,(req,res)=>{
    console.log(`server is runninng on the: ${port}`);
});