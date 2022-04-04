"use strict";
exports.__esModule = true;
exports.FeedbackRoute = void 0;
// Import all request respsonse handlers from the controllers folder.
var feedbackController = require("../controllers/feedback");
// Export a class that has a property for request handlers. 
var FeedbackRoute = /** @class */ (function () {
    function FeedbackRoute() {
    }
    FeedbackRoute.prototype.routes = function (app) {
        // Here the request is a GET request, but can be expanded to include other request types.
        app.route('/v1/feedback').post(feedbackController.addFeedback);
    };
    return FeedbackRoute;
}());
exports.FeedbackRoute = FeedbackRoute;
