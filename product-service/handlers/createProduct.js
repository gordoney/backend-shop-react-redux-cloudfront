'use strict';

import headers from '../shared/headers';
import internalServerError from '../errors/internalServerError';
import ProductService from '../services/productService';

export const createProduct = async (event) => {
  try {
    console.log('createProduct, body:', event.body);
    
    const productService = new ProductService();
    const product = JSON.parse(event.body);

    const isCreated = await productService.createProduct(product);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        isSuccess: isCreated
      })
    };
  } catch (error) {
    return internalServerError;
  }
};
