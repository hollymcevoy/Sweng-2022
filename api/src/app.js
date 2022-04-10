"use strict";
exports.__esModule = true;
// import everything from the core express libraries
var bodyParser = require("body-parser");
var winston = require("winston");
var expressWinston = require("express-winston");
var express = require("express");
var multer = require("multer");
var documents_1 = require("./routes/documents");
var questions_1 = require("./routes/questions");
var feedback_1 = require("./routes/feedback");
var index_1 = require("./routes/index");
// The App class is configured here and an instance of the object class is exported to be used by the main server.ts file.  
var App = /** @class */ (function () {
    // Assign the app property to an instance of the express.application object type.
    function App() {
        this.indexRoute = new index_1.IndexRoute();
        this.documentRoute = new documents_1.DocumentRoute();
        this.questionsRoute = new questions_1.QuestionsRoute();
        this.feedbackRoute = new feedback_1.FeedbackRoute();
        this.app = express();
        this.app.use(bodyParser.json());
        this.indexRoute.routes(this.app);
        this.documentRoute.routes(this.app);
        this.questionsRoute.routes(this.app);
        this.feedbackRoute.routes(this.app);
        // Middleware function that has access to incoming requests and outgoing responses. Parses them as JSON.
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(multer().array());
        this.app.use(express.static('public'));
        this.app.use(expressWinston.logger({
            transports: [new winston.transports.Console()]
        }));
    }
    return App;
}());
// Exports an instance of this class to be used in the main server.ts file.
exports["default"] = new App().app;
