const Rekognition = require('aws-sdk/clients/rekognition');

require('dotenv').config();
const {
  S3_BUCKET,
  REKOGNITION_REGION,
  REKOGNITION_ACCESS_KEY_ID,
  REKOGNITION_SECRET_ACCESS_KEY,
} = process.env;

const client = new Rekognition({
  region: REKOGNITION_REGION,
  accessKeyId: REKOGNITION_ACCESS_KEY_ID,
  secretAccessKey: REKOGNITION_SECRET_ACCESS_KEY,
});

const compareFaces = async (base64Image, imageS3) => {
  const params = {
    SourceImage: {
      Bytes: Buffer.from(base64Image, 'base64'),
    },
    TargetImage: {
      S3Object: {
        Bucket: S3_BUCKET,
        Name: imageS3,
      },
    },
    SimilarityThreshold: '80',
  };

  return await client.compareFaces(params).promise();
};

const detectLabels = async (base64Image) => {
  const params = {
    Image: {
      Bytes: Buffer.from(base64Image, 'base64'),
    },
  };

  return await client.detectLabels(params).promise();
};

module.exports = { compareFaces, detectLabels };
