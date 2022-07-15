'use strict';

import getProducts from '../shared/getProducts';
import headers from '../shared/headers';
import internalServerError from '../errors/internalServerError';
import productNotFoundError from '../errors/productNotFoundError';

export const getProductById = async (event) => {
  try {
    const products = await getProducts().then(result => result);
    const product = products.filter(product => product.id === event.pathParameters.id);

    if (product.length === 0) {
      return JSON.stringify(productNotFoundError);
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product[0]),
    };
  } catch (error) {
    return JSON.stringify(internalServerError);
  }
};
