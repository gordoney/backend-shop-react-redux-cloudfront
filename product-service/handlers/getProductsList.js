'use strict';

import getProducts from './../shared/getProducts';
import headers from './../shared/headers';
import internalServerError from './../errors/internalServerError';

export const getProductsList = async () => {
  try {
    const products = await getProducts().then(result => result);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return JSON.stringify(internalServerError);
  }
};
