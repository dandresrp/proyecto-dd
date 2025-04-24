import { query } from '../../src/config/db.js';
import { SQL_GET_ALL_STAGES } from '../../src/controllers/stages/sql.js';

export const findAllStages = async () => {
  const result = await query(SQL_GET_ALL_STAGES);
  return result.rows;
};
