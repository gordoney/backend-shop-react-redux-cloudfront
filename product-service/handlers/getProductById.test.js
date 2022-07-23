import { getProductById } from "./getProductById";
import headers from '../shared/headers';
import productNotFoundError from '../errors/productNotFoundError';

describe('getProductById', () => {
  test('returns product', async () => {
    const data = await getProductById({
      pathParameters: {
        id: '1'
      }
    });
    expect(data).toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify({
        "count": 4,
        "description": "Short Product Description1",
        "id": "1",
        "price": 2.4,
        "title": "ProductOne"
      }),
    });
  });

  test('returns product not found error', async () => {
    const data = await getProductById({
      pathParameters: {
        id: '10'
      }
    });
    expect(data).toEqual(JSON.stringify(productNotFoundError));
  });
});