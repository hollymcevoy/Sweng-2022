"use strict";
exports.__esModule = true;
exports.auth0_base_url = exports.auth0_domain = exports.PORT = void 0;
// config to load in environment variables
var dotenv = require("dotenv");
dotenv.config({ path: 'api/.env' });
exports.PORT = String(process.env.PORT);
exports.auth0_domain = String(process.env.AUTH0_DOMAIN);
exports.auth0_base_url = String(process.env.AUTH0_BASE_URL);
