'use strict';

const AWS = require('aws-sdk');
const BUCKET = 'aws-shop-react-redux-cloudfront-uploaded';

module.exports = {
    importProductsFile: async function(event) {
        const s3 = new AWS.S3();
        
        try {
            const catalogName = event.queryStringParameters.name;
            const catalogPath = `uploaded/${catalogName}`;
        
            const params = {
                Bucket: BUCKET,
                Key: catalogPath,
                Expires: 60,
                ContentType: 'text/csv'
            };

            const url = await s3.getSignedUrlPromise('putObject', params)

            return {
                statusCode: 200, 
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(url),
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: "An unknown error has occurred. Please try again."
            };
        }
    }
}