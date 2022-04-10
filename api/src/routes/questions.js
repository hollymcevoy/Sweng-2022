"use strict";
exports.__esModule = true;
exports.QuestionsRoute = void 0;
// Import all request respsonse handlers from the controllers folder.
var questionsController = require("../controllers/questions");
// Export a class that has a property for request handlers. 
var QuestionsRoute = /** @class */ (function () {
    function QuestionsRoute() {
    }
    QuestionsRoute.prototype.routes = function (app) {
        // Here the request is a GET request, but can be expanded to include other request types.
        app.route('/v1/questions').post(questionsController.postQuestions);
        app.route('/v1/questions').get(questionsController.getQuestions);
    };
    return QuestionsRoute;
}());
exports.QuestionsRoute = QuestionsRoute;
