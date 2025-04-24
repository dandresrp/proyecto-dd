import { query } from '../../config/db.js';
import { SQL_GET_ALL_STAGES } from '../../controllers/stages/sql.js';

export const findAllStages = async () => {
  const result = await query(SQL_GET_ALL_STAGES);
  return result.rows;
};
