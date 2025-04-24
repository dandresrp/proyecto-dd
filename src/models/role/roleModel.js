import { query } from '../../config/db.js';
import { SQL_GET_ALL_ROLES } from '../../controllers/role/sql.js';

export const findAllRoles = async () => {
  const result = await query(SQL_GET_ALL_ROLES);
  return result.rows;
};
