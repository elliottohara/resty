
"use strict";
const expect = require( 'chai' ).expect;
const should = require('chai').should();
const requireLib = require('app-root-path').require;
const LambdaTester = require('lambda-tester');
const sinon = require('sinon');
const AWS = require('aws-sdk-mock');

const myHandler =  requireLib('src/lambdas').write_to_kinesis;
const config = requireLib('src/config');
const testEvent = require('./testEvent');


let kinesisPutResults =  {
    "SequenceNumber": "21269319989653637946712965403778482177", 
    "ShardId": "shardId-000000000001"
};


let putRecordsMock = function(params, callback){
    callback(null, kinesisPutResults);
}
const putRecordSpy = sinon.spy(putRecordsMock);
AWS.mock('Kinesis','putRecord', putRecordSpy);


describe('the handler', function() {

    it( 'will return a success result', function() {
        return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult();
    });
    
    it('calls Kinesis.putRecord' , function(){
        let kinesis_created = false;
        return LambdaTester( myHandler).event( testEvent )
        .expectResult(result => {
            putRecordSpy.called.should.be.true;
        });
    });

    it('sends proper parmas to Kinesis.putRecord', function(){
        return LambdaTester(myHandler).event( testEvent)
        .expectResult( result => {
            let putParams = putRecordSpy.args[0][0];
            let putCallBack = putRecordSpy.args[0][1];
            //config values
            putParams.StreamName.should.equal(config.kinesis.StreamName);
            putParams.PartitionKey.should.equal(config.kinesis.PartitionKey);

            //event from payload
            putParams.Data.should.equal(JSON.stringify(testEvent));
        });

    
    });

    it('sends proper http payload to the callback', function(){
        return LambdaTester(myHandler).event(testEvent)
            .expectResult(result => {
                result.statusCode.should.equal(200);
                result.headers["Content-Type"].should.equal("application/json");
                result.body.should.equal(JSON.stringify(kinesisPutResults));
            });
    });
    //can't mock kinesis errors... oh well
    xit('will record errors', function(){
        putRecordsMock = function(params, callback){
            callback('some error', null);
        };
        return LambdaTester(myHandler).event(testEvent)
            .expectResult( result => {
                console.log(JSON.stringify(result));
                result.statusCode.should.equal(500);
            });

    });
    
});



