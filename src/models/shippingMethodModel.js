import { query } from '../../src/config/db.js';
import { SQL_GET_ALL_SHIPPING_METHODS } from '../../src/controllers/shippingMethods/sql.js';

export const findAllShippingMethods = async () => {
  const result = await query(SQL_GET_ALL_SHIPPING_METHODS);
  return result.rows;
};
