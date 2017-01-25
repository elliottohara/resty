#Resty#

Right now, this is just a simple lambda that'll record anything sent to it to a kinesis stream.
The goal here is to wire lambdas up to enable more complicated workflows in a microservice faction 
and to create a simple framework for apps that would enable not just CRUD operations, but also complicated
event based triggers. 


##Install##

* Clone the repo
* `npm install`


##Deploying and running on AWS##

I don't have everything automated yet, so there are still a few manual steps you'll need to do through the AWS console.

###Setting up AWS permissions and Kenisis stream###

First, you'll need to create Kinesis stream. Whatever you name it, the src/config.json needs to match it. 
The current code uses "api-calls". Next, create a IAM role for your lambda that has the correct access to the Kenisis stream and 
write access for logging. You can copy the policy from the kesines_logger_policy.json file in the repo but update the arn to match
the arn for the Kenisis stream you just made. 

###Setting up deployment###
* Make sure you have the [aws cli](https://aws.amazon.com/cli/) installed 
* Update deployment-config.js to match your AWS credentials. *Note that the profile is only needed if you've got multiple profiles set up with your aws config.*
* run `npm run deploy`
* After this is done, you'll need to create an AWS API Gateway with a proxy resource that points at the lambda you just made. 




