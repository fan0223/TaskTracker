import dotenv from 'dotenv';
dotenv.config();

import AWS from 'aws-sdk';

const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

AWS.config.update({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
})

export const s3Client = new AWS.S3();