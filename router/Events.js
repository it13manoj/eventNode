const express = require("express");
const { create, update, find, findByPk, updateStatus, calculate } = require("../controller/Admin/Events");

const Route = express.Router();


Route.post("/Events/create", create)
Route.put("/Events/update/:id",update)
Route.get("/Events/find",find)
Route.get("/Events/findByPk/:id", findByPk)
Route.put("/Events/updateStatus/:id", updateStatus)
Route.get("/Events/calculate/:date/:num/:catid/:scatid", calculate)




module.exports = Route