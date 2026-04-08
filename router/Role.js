const express = require("express");
const Route = express.Router();
const RoleController = require("../controller/Users/Role")

Route.get("/profile", (req, res) => {
    console.log("welcome");
    res.send("Profile API working");
});

Route.post("/create",RoleController.create)
Route.get("/role",RoleController.role)





module.exports = Route;