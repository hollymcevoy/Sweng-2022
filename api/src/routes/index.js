"use strict";
exports.__esModule = true;
exports.IndexRoute = void 0;
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config({ path: '.env' });
var corsOptions = {
    origin: true
};
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
    }
    IndexRoute.prototype.routes = function (app) {
        // router is passed app and can use cors middleware
        app.use(cors(corsOptions));
        app.route('/index').get(function (req, res) {
            res.status(200).send({ status: 'success' });
        });
    };
    return IndexRoute;
}());
exports.IndexRoute = IndexRoute;
