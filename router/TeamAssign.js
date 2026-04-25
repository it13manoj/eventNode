const express = require("express");
const { createTeamAssign, find } = require("../controller/Admin/TeamAssign");


const Route = express.Router();


Route.post("/teamAssign/create", createTeamAssign)
// Route.put("/teamAssign/update/:id",update)
Route.get("/teamAssign/find/:id",find)
// Route.get("/teamAssign/findByPk/:id", findByPk)
// Route.put("/teamAssign/updateStatus/:id", updateStatus)





module.exports = Route