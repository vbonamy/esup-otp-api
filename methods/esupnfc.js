var properties = require(__dirname + '/../properties/properties');
var restify = require('restify');
var utils = require(__dirname + '/../services/utils');
var logger = require(__dirname + '/../services/logger').getInstance();
var sockets = require('../server/sockets');

exports.name = "esupnfc";

exports.locations = function (req, res, next) {
    logger.debug("locations: ESUP-OTP");
    res.send(["ESUP-OTP"]);
};

exports.check_accept_authentication = function (req, res, next) {
    logger.debug("check_accept_authentication: ESUP-OTP");
    res.send("OK");
};

exports.accept_authentication = function (user, req, res, next) {
    logger.debug("accept_authentication: ESUP-OTP");
    sockets.emitCas(user.uid,'userAuth', {"code": "Ok", "otp": user.push.code});
    res.send({
        "code": "Ok"
    });
    logger.debug("sockets.emitCas OK : otp = " + user.push.code);    
};

exports.send_message = function (user, req, res, next) {
    logger.debug("send_message: ESUP-OTP");
    // TODO : pas de display si en mode push/auto
    //res.send("");
    res.send("<h1>Code :</h1><p>" + user.push.code + "</p>");
};
