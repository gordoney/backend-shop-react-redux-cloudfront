'use strict';

import headers from '../shared/headers';
import internalServerError from '../errors/internalServerError';
import productNotFoundError from '../errors/productNotFoundError';
import ProductService from '../services/productService';

export const getProductById = async (event) => {
  try {
    console.log('getProductById, id:', event.pathParameters.id);
    
    const productService = new ProductService();
    const result = await productService.getProductById(event.pathParameters.id);

    if (result.statusCode === 500 || result.length === 0) {
      return productNotFoundError;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result[0]),
    };
  } catch (error) {
    return internalServerError;
  }
};
