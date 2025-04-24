import { query } from '../../src/config/db.js';
import { SQL_GET_ALL_ROLES } from '../../src/controllers/role/sql.js';

export const findAllRoles = async () => {
  const result = await query(SQL_GET_ALL_ROLES);
  return result.rows;
};
