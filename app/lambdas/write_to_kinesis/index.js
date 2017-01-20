/*
Kenisis Logger

This function simply logs whatever is sent to it to kinesis.

*/
"use strict";
const AWS = require('aws-sdk');
const lambdaProxy = require('lambda-proxy-response');
const config = require('./config');



exports.handler = (event, context, callback) => {
    const kenisis = new AWS.Kinesis();
    const params = config.kinesis;
    params.Data =  JSON.stringify(event);
    kenisis.putRecord(params, (err, data) => {
        let response;
        if(err){
            response = lambdaProxy.response(500, {"Content-Type":"application/json"}, err);
            
        }else{
            response = lambdaProxy.response(200, {"Content-Type":"application/json"},data);
        }
        callback(null, response);
    });
}

