"use strict";
exports.__esModule = true;
exports.APIRoute = void 0;
// Import all request respsonse handlers from the controllers folder.
var apiController = require("../controllers/api");
// Export a class that has a property for request handlers. 
var APIRoute = /** @class */ (function () {
    function APIRoute() {
    }
    APIRoute.prototype.routes = function (app) {
        // Here the request is a GET request, but can be expanded to include other request types.
        app.route('/api').get(apiController.getApi);
    };
    return APIRoute;
}());
exports.APIRoute = APIRoute;
