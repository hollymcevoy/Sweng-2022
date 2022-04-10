"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getQuestions = exports.postQuestions = void 0;
var logger_1 = require("../utilities/logger");
var node_fetch_1 = require("node-fetch");
// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
exports.postQuestions = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var question, docName, api_key, azureData, azureDataJson, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                question = req.body.question;
                docName = req.body.docName;
                api_key = process.env.AZURE_KEY;
                return [4 /*yield*/, node_fetch_1["default"]("https://sweng-cog.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=" + docName + "&api-version=2021-10-01", {
                        method: 'POST',
                        headers: {
                            'OCP-APIM-Subscription-Key': api_key,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "question": question,
                            "top": 3,
                            "answerSpanRequest": {
                                "enable": true,
                                "confidenceScoreThreshold": 0.5,
                                "topAnswersWithSpan": 1
                            }
                        })
                    })];
            case 1:
                azureData = _a.sent();
                return [4 /*yield*/, azureData.json()];
            case 2:
                azureDataJson = _a.sent();
                if (azureData.status === 404) {
                    return [2 /*return*/, res.status(404).send("Error: " + azureDataJson.error.message)];
                }
                return [2 /*return*/, res.status(200).send(azureDataJson)];
            case 3:
                error_1 = _a.sent();
                logger_1.APILogger.logger.info(error_1);
                return [2 /*return*/, res.status(500).send(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getQuestions = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var docName, api_key, azureData, azureDataJson, qnas, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                docName = req.query.docName;
                api_key = process.env.AZURE_KEY;
                return [4 /*yield*/, node_fetch_1["default"]("https://sweng-cog.cognitiveservices.azure.com/language/query-knowledgebases/projects/" + docName + "/qnas?api-version=2021-10-01", {
                        method: 'GET',
                        headers: {
                            'OCP-APIM-Subscription-Key': api_key,
                            'Content-Type': 'application/json'
                        }
                    })];
            case 1:
                azureData = _a.sent();
                return [4 /*yield*/, azureData.json()];
            case 2:
                azureDataJson = _a.sent();
                if (azureData.status === 404) {
                    return [2 /*return*/, res.status(404).send("Error: " + azureDataJson.error.message)];
                }
                qnas = azureDataJson.value.map(function (qna) {
                    return {
                        id: qna.id,
                        question: qna.questions,
                        answer: qna.answer
                    };
                });
                return [2 /*return*/, res.status(200).send(qnas)];
            case 3:
                error_2 = _a.sent();
                logger_1.APILogger.logger.info(error_2);
                return [2 /*return*/, res.status(500).send(error_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
