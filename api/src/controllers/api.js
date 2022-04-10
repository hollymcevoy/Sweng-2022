"use strict";
exports.__esModule = true;
exports.getApi = void 0;
// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
exports.getApi = function (req, res, next) {
    res.status(200).send({ title: 'QnA API', version: '0.1.0' });
};
