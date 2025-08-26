const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.S3_BUCKET;

exports.uploadFile = async ({ fileName, fileContent }) => {
  const buffer = Buffer.from(fileContent, "base64");

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: buffer,
  };

  await s3.putObject(params).promise();
  return { statusCode: 200, body: "File uploaded" };
};

exports.deleteFile = async ({ fileName }) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  await s3.deleteObject(params).promise();
  return { statusCode: 200, body: "File deleted" };
};
