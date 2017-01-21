"use strict";
const AWS = require('aws-sdk');
const lambdaProxy = require('lambda-proxy-response');
const config = require('./config');


/// kenisis logger. Will log events to the kenisis stream
exports.write_to_kinesis = (event, context, callback) => {
    console.log('Received event', JSON.stringify(event, null, 2));
    const kenisis = new AWS.Kinesis();
    const params = config.kinesis;
    params.Data =  JSON.stringify(event);
    kenisis.putRecord(params, (err, data) => {
        let response;
        
        if(err){
            console.log('Kinesis error: ', JSON.stringify(err, null, 2));
            response = lambdaProxy.response(500, {"Content-Type":"application/json"}, err);
            callback(err, null);
            return;
            
        }else{
            console.log('Kinesis response:', JSON.stringify(data, null, 2));
            response = lambdaProxy.response(200, {"Content-Type":"application/json"},data);
            callback(null, response);
        }
    });
};



