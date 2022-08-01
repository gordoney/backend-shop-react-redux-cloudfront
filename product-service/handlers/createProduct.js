'use strict';

import headers from '../shared/headers';
import internalServerError from '../errors/internalServerError';
import ProductService from '../services/productService';
import incorrectProductDataError from '../errors/incorrectProductDataError';

export const createProduct = async (event) => {
  try {
    console.log('createProduct, body:', event.body);

    const productService = new ProductService();
    const product = JSON.parse(event.body);

    if (product.title === undefined
      || product.description === undefined
      || product.price === undefined
      || product.count === undefined) {
        return incorrectProductDataError;
    }

    const { isCreated } = await productService.createProduct(product);

    if (isCreated === undefined) {
      return internalServerError;
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          isSuccess: isCreated
        })
      };
    }
  } catch (error) {
    return internalServerError;
  }
};
