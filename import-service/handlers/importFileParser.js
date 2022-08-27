'use strict';

const AWS = require('aws-sdk');
const BUCKET = 'aws-shop-react-redux-cloudfront-uploaded';
const s3 = new AWS.S3({ region: 'eu-west-1' });
const sqs = new AWS.SQS();
const csv = require('csv-parser');

module.exports = {
    importFileParser: async function(event) {
        try {
            for (const record of event.Records) {
                const params = {
                    Bucket: BUCKET,
                    Key: record.s3.object.key
                };

                await s3.getObject(params).createReadStream()
                    .pipe(csv())
                    .on('data', (data) => {
                        sqs.sendMessage({
                            QueueUrl: process.env.SQS_URL,
                            MessageBody: JSON.stringify(data)
                        }, (error) => {
                            
                        });
                    });
            
                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: `${BUCKET}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                await s3.deleteObject({
                    Bucket: BUCKET,
                    Key: record.s3.object.key
                }).promise();
            }
        
            return {
                statusCode: 200, 
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: "An unknown error has occurred. Please try again."
            };
        }
    }
}