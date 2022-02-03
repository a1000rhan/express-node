const express = require("express");

const { signUp } = require("./controller");
const routers = express.Router();

routers.post("/signup", signUp);

module.exports = routers;
