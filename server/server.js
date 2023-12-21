var express=require("express")
var app=express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");
app.use(cors({
    origin: "*"
}));

const userRouter= require("./route.job")

app.use("/api/v1/listJobs",userRouter)

app.listen(3000,()=>{
    console.log( "run port 3000");
})