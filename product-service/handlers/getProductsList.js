'use strict';

import internalServerError from '../errors/internalServerError';
import ProductService from '../services/productService';

export const getProductsList = async (event) => {
  try {
    console.log('getProductsList');
    
    const productService = new ProductService();
    const products = await productService.getProductsList();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(products),
    };
  } catch (error) {
    return internalServerError;
  }
};
