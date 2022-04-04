"use strict";
exports.__esModule = true;
exports.authMiddleware = void 0;
var express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
var config_1 = require("../config");
exports.authMiddleware = express_oauth2_jwt_bearer_1.auth({
    audience: config_1.auth0_domain,
    issuerBaseURL: config_1.auth0_base_url
});
