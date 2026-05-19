require("dotenv").config();
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const bodyParser= require("body-parser")
const { PORT } = process.env
const sequelize = require("./db/conenction");
const users  = require("./router/index")
const admin = require("./router/Admin")
const exportFullDatabase = require("./config/exportFullDatabase");
const { getDistances } = require("./controller/Admin/GeoCalculator");

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



app.use("/api/v1/admin",admin.Category)
app.use("/api/v1/admin",admin.SubCategory)
app.use("/api/v1/admin",admin.Inventories)
app.use("/api/v1/admin",admin.Events)
app.use("/api/v1/admin",admin.WareHouse)
app.use("/api/v1/admin",admin.VehicleType)
app.use("/api/v1/admin",admin.Vehicle)
app.use("/api/v1/admin",admin.TeamAssign)
app.post("/api/v1/distance", getDistances)



http.createServer(app).listen(PORT,(req,res)=>{
    console.log("Server is running on "+PORT);
    
})