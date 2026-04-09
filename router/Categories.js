const express = require("express")
const { create, updates, deletes } = require("../controller/Admin/Categories")
const { finds } = require("../controller/Admin/SubCategories")
const Route = express.Router()

Route.post("/category/create", create)
Route.put("/category/update/:id",updates)
Route.get("/category/find",finds)
Route.delete("/category/delete", deletes)


module.exports = Route