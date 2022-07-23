import products from './productList.json';

const getProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(products);
    } catch(error) {
      reject(error);
    }
  });
}

export default getProducts;