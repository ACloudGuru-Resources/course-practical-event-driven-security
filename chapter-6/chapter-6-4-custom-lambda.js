const AWS = require("aws-sdk"); // Loads the AWS SDK for JavaScript.
const s3 = new AWS.S3(); // Constructs a service object to use the aws.S3 class.
const config = new AWS.ConfigService(); // Constructs a service object to use the aws.ConfigService class.

// Receives the event and context from AWS Lambda. You can copy this handler and use it in your own code too!
exports.handler = async (event, context, callback) => {
  // AWS Config sent us a ResultToken
  const ResultToken = event.resultToken;

  // Fetch the S3 buckets
  const result = await s3.listBuckets().promise();
  const buckets = result.Buckets;

  // Evaluate the buckets
  const Evaluations = [];
  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i];
    const compliant = bucket.Name.startsWith("my-acg");
    const evaluation = {
      ComplianceResourceType: "AWS::S3::Bucket",
      ComplianceResourceId: bucket.Name,
      ComplianceType: compliant ? "COMPLIANT" : "NON_COMPLIANT",
      OrderingTimestamp: new Date()
    };
    Evaluations.push(evaluation);
  }

  // Report back to AWS Config
  const putEvaluationsRequest = {
    Evaluations: Evaluations,
    ResultToken: ResultToken, // Needs to be a result token sent from AWS Config as part of the event.
    TestMode: true // Used if you don't have a real result token.
  };

  const configResult = await config
    .putEvaluations(putEvaluationsRequest)
    .promise();

  if (configResult.FailedEvaluations.length > 0) {
    console.error(configResult);
  } else {
    console.log("Uploaded results to AWS Config");
  }
};
