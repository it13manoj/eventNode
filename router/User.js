const express = require("express");
const Route = express.Router();
const userController = require("../controller/Users/Users")
const Auth = require("../Middleware/Auth");
const upload = require("../utils/upload");


Route.post("/signup",userController.create)
Route.get("/all",userController.users)
Route.post("/login",userController.login)
Route.get("/find",Auth, userController.users);
Route.put("/update/:id",Auth, upload.single("image"), userController.update);



module.exports = Route;