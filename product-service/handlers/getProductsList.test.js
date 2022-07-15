import { getProductsList } from "./getProductsList";
import products from './../shared/productList.json';
import headers from './../shared/headers';

describe('getProductsList', () => {
  test('returns products', async () => {
    const data = await getProductsList();
    expect(data).toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    });
  });
});
