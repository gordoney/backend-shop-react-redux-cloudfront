import createConnection from '../dbClient.js';
import internalServerError from '../errors/internalServerError';
import incorrectProductDataError from '../errors/incorrectProductDataError';
import SQL_ERROR_CODES from '../errors/SQL_ERROR_CODES.js';

class ProductService {
  async getProductsList() {
    const dbClient = createConnection();

    try {
      const { rows: products } = await dbClient
        .query('select * from products left join stocks on products.id = stocks.product_id');

      return products;
    } catch (error) {
      return internalServerError;
    } finally {
      await dbClient.end();
    }
  }

  async getProductById(id) {
    const dbClient = createConnection();

    try {
      const { rows: products } = await dbClient
        .query(`select * from products left join stocks on products.id = stocks.product_id where id='${id}'`);

      return products;
    } catch (error) {
      return internalServerError;
    } finally {
      await dbClient.end();
    }
  }

  async createProduct(product) {
    const dbClient = createConnection();

    try {
      await dbClient.query('BEGIN');
      const productResult = await dbClient
        .query(`insert into products (title, description, price) values ('${product.title}', '${product.description}', ${product.price}) returning id`);
      const stockResult = await dbClient
        .query(`insert into stocks (product_id, count) values ('${productResult.rows[0].id}', '${product.count}')`);
      await dbClient.query('COMMIT');
      return {
        isCreated: productResult.rowCount > 0 && stockResult.rowCount > 0
      };
    } catch (error) {
      await dbClient.query('ROLLBACK');

      if (error.code === SQL_ERROR_CODES['UNDEFINED_COLUMN']) {
        return incorrectProductDataError;
      }
      
      return internalServerError;
    } finally {
      await dbClient.end();
    }
  }
}

export default ProductService;