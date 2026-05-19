const express = require("express");
const { create, update, find, deletes, findByPk, findBycategories, findBycategoriesAndSubCategories, calculate ,countsItems, Items  } = require("../controller/Admin/Inventory");
const Route = express.Router();


Route.post("/Inverntory/create", create)
Route.put("/Inverntory/update/:id",update)
Route.get("/Inverntory/find",find)
Route.delete("/Inverntory/delete/:id", deletes)
Route.get("/Inverntory/findByPk/:id", findByPk)
Route.get("/Inverntory/findBycategories/:id", findBycategories)
Route.get("/Inverntory/findBycategoriesAndSubCategories/:cid/:sid", findBycategoriesAndSubCategories)
Route.get("/Inverntory/calculate/:catId/:scatId", calculate)
Route.get("/Inverntory/items/calculate/:id", countsItems)
Route.get("/Inverntory/items/find/:id", Items)


module.exports = Route