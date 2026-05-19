const express = require("express");
const { create, update, find, findByPk, updateStatus, calculate , getDesign, findEventBookedItems} = require("../controller/Admin/Events");

const Route = express.Router();


Route.post("/Events/create", create)
Route.put("/Events/update/:id",update)
Route.get("/Events/find",find)
Route.get("/Events/findByPk/:id", findByPk)
Route.put("/Events/updateStatus/:id", updateStatus)
Route.get("/Events/calculate/:date/:num/:catid/:scatid", calculate)
Route.get("/Events/Design/find", getDesign)
Route.get("/Events/bookedEvents/items/:id", findEventBookedItems)


module.exports = Route