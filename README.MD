# Cloudformation Challenge

Deploy a SAM template which creates resources to :
- Successfully write to the DynamoDB Table once a POST request is received by the API Gateway.
- Add any required resources to send a message to a SNS Topic whenever a new item is added to the DynamoDB Table.

### Pre-requisites
Install the dependencies to run the template:
- aws-cli
- sam-cli

Please follow this https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html to install the required dependencies first.


### Set up 

```sh
$ aws s3 mb s3://remember-to-delete-bucket
```

### Packaging with SAM 

```sh
$ sam package --template-file sam-template.yaml --s3-bucket remember-to-delete-bucket --output-template-file packaged.yaml
```

### Deployment

```sh
$ sam deploy --template-file //PATH-TO-PACKAGED.YAML --stack-name sam-stack  --capabilities CAPABILITY_IAM --parameter-overrides "MyName=emilyha" "Email={YOUR_EMAIL}@gmail.com" "TopicName=dynamoStreams"
```


#### Improvements
- Better handling of Parameter validation in the lambda. Eg. To handle when incompatible data types are given instead of the accepted ‘string’ data type. 
- Configure TracingConfig to trace incoming requests with AWS X-ray 
- Unit Testing + Integration Tests
- Authentication
- Check for Duplicate data (data already inserted) in lambda
- VPC configurations
- TAG all resources
- Cloudformation StackSet for multi region / multi-account deployment
- Use SQS FiFO queues for deduplication with MessageDeduplicationId (https://aws.amazon.com/blogs/aws/new-for-amazon-simple-queue-service-fifo-queues-with-exactly-once-delivery-deduplication/) 
- Use CodePipeline to trigger deployment when commits are made - one for production branch and one for master branch following Gitlab flow strategy. 
- Since I’ve chosen to use SAM, It would be nice to be integrated with CodeBuild and CodeDeploy for gradual code deployment.
- Try a serverless framework such as Architect (https://arc.codes/)
- You can create a an Analytics Pipeline by writing the DynamoDB stream records to Kinesis Firehose (using Lambda or a Kinesis Client Library application), then on to S3 for batching into Redshift.
- Replace use of dynamoDB Streams with Kinesis Streams to cut costs if feasible with architecture needs. 
![Screenshot](cost.png)


### Todos
 - Licence


