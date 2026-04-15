const express = require("express");
const Route = express.Router();
const { create, findByVehicletype, find, findById, update, delets } = require("../controller/Admin/Vehicle")
const Auth = require("../Middleware/Auth");
const upload = require("../utils/upload");


Route.post("/vehicleDetails/create",upload.single("image"), create)
Route.get("/vehicleDetails/find",find)
Route.get("/vehicleDetails/findBytype/:id",findByVehicletype)
Route.get("/vehicleDetails/findById/:id",findById)
Route.put("/vehicleDetails/update/:id",update)
Route.put("/vehicleDetails/delete/:id",delets)



module.exports = Route;