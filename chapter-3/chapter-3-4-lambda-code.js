const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async event => {
  console.log(JSON.stringify(event));

  // Only trigger on CreateBucket
  if (event.detail.eventName === "CreateBucket") {
    // Get the Bucket Name from the event
    const bucketName = event.detail.requestParameters.bucketName;
    console.log("Enabling versioning on", bucketName);

    const params = {
      Bucket: bucketName,
      VersioningConfiguration: {
        Status: "Enabled"
      }
    };

    // Enable versioning
    await s3.putBucketVersioning(params).promise();
    console.log("Enabled versioning on", bucketName);
  }
};
