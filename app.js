require("dotenv").config();
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const bodyParser= require("body-parser")
const { PORT } = process.env
const sequelize = require("./db/conenction");
const users  = require("./router/index")


app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

sequelize.sync()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


app.use("/api/v1/users",users.roleRoutes);
app.use("/api/v1/users",users.userRouters);

http.createServer(app).listen(PORT,(req,res)=>{
    console.log("Server is running on "+PORT);
    
})