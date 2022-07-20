'use strict';

import headers from '../shared/headers';
import internalServerError from '../errors/internalServerError';
import ProductService from '../services/productService';

export const getProductsList = async (event) => {
  try {
    console.log('getProductsList');
    
    const productService = new ProductService();
    const products = await productService.getProductsList();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return internalServerError;
  }
};
