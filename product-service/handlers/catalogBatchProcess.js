'use strict';

import internalServerError from '../errors/internalServerError';
import ProductService from '../services/productService';
const AWS = require('aws-sdk');

export const catalogBatchProcess = async (event) => {
  try {
    const productService = new ProductService();
    const sns = new AWS.SNS();
    
    for (const record of event.Records) {
      const product = JSON.parse(record.body);
      const { isCreated } = await productService.createProduct(product);

      let snsResult = await sns.publish({
        Subject: 'New product was added',
        Message: JSON.stringify(product),
        TopicArn: process.env.SNS_ARN,
        MessageAttributes: {
          'type': { DataType: 'String', StringValue: 'filter' },
        },
      }).promise();
    }
  } catch (error) {
    return internalServerError;
  }
};
