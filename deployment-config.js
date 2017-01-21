exports.write_to_kinesis = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "lambdas.write_to_kinesis",
  "role": "arn:aws:iam::652113781882:role/kinesis_logger",
  "functionName": "write_to_kinesis",
  "timeout": 10,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs4.3",
  
};