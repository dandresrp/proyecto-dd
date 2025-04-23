import { query } from '../../src/config/db.js';
import { SQL_GET_ALL_VALUES } from '../../src/controllers/value/sql.js';

export const findAllValues = async () => {
  const result = await query(SQL_GET_ALL_VALUES);
  return result.rows;
};
