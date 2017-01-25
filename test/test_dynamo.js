"use strict";
const expect = require( 'chai' ).expect;
const should = require('chai').should();
const requireLib = require('app-root-path').require;
const LambdaTester = require('lambda-tester');
const sinon = require('sinon');
const AWS = require('aws-sdk-mock');

const myHandler =  requireLib('src/lambdas').dynamoPut;
const config = requireLib('src/config');
const testEvent = require('./testEvent');


const putRecordSpy = sinon.spy((params, callback )=> {
    callback(null,{})
});
AWS.mock('DynamoDB.DocumentClient','put', putRecordSpy);

describe('The dynamo db handler', () => {
    it('will execute a dynamo put put http requests', ()=>{
          testEvent.httpMethod = "PUT";
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                putRecordSpy.called.should.be.true;
            });
    });
    it('sets the dynamo db table properly', ()=> {
        testEvent.httpMethod = "PUT";
        testEvent.path = "/test";
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                console.log(JSON.stringify(putRecordSpy.args));
                let dynamoParams = putRecordSpy.args[0][0];
                dynamoParams.TableName.should.equal("test");
            });
    });

});
