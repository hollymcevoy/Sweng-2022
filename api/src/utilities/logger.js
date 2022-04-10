"use strict";
exports.__esModule = true;
exports.APILogger = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, prettyPrint = winston_1.format.prettyPrint, printf = winston_1.format.printf;
var APILogger = /** @class */ (function () {
    function APILogger() {
    }
    APILogger.format = printf(function (info) {
        return "[" + info.timestamp + "] [" + info.level + "] => " + info.message;
    });
    APILogger.logger = winston_1.createLogger({
        format: combine(label({ label: 'api errors' }), timestamp(), APILogger.format),
        level: 'info',
        transports: [
            new winston_1.transports.File({ filename: 'apilogs.log' }),
            new winston_1.transports.Console()
        ]
    });
    return APILogger;
}());
exports.APILogger = APILogger;
