module.exports = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "index.handler",
  "role": "arn:aws:iam::652113781882:role/write_to_kinesis",
  "functionName": "write_to_kinesis",
  "timeout": 10,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs4.3",
  
}