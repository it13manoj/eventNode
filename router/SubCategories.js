const express = require("express");
const { create, updates, finds, deletes, findByid } = require("../controller/Admin/SubCategories");
const Route = express.Router();


Route.post("/subCategory/create", create)
Route.put("/subCategory/update/:id",updates)
Route.get("/subCategory/find",finds)
Route.delete("/subCategory/delete", deletes)
Route.get("/subCategory/findByid/:id", findByid)





module.exports = Route