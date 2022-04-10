"use strict";
exports.__esModule = true;
// We import an instance of the class object here. 
var app_1 = require("./app");
// Assign port from .env file or default to 3000 (Will add environment variable setups later)
var PORT = Number(process.env.PORT) || 3000;
// Pass a port and a function and the app class recieves a http.Server object as a callback function.
app_1["default"].listen(PORT, function () {
    console.log("QnA API Server running on port: " + PORT);
});
