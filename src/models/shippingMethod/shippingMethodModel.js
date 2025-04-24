import { query } from '../../config/db.js';
import { SQL_GET_ALL_SHIPPING_METHODS } from '../../controllers/shippingMethods/sql.js';

export const findAllShippingMethods = async () => {
  const result = await query(SQL_GET_ALL_SHIPPING_METHODS);
  return result.rows;
};
