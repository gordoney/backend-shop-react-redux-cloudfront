const AWS = require('aws-sdk-mock');
const handler = require('./importProductsFile');

AWS.mock('S3', 'getSignedUrl', (action, _params, callback) => {
  callback(null,_params.Key);
})

describe('importProductsFile', () => {
  test('returns url', async () => {
    const data = await handler.importProductsFile({
      queryStringParameters: {
        name: 'test'
      }
    });
    
    expect(data).toEqual({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify('uploaded/test'),
    });
  });

  test('returns error', async () => {
    const data = await handler.importProductsFile();
    
    expect(data).toEqual({
      statusCode: 500,
      message: "An unknown error has occurred. Please try again."
    });
  });
});