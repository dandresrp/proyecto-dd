import { query } from '../../config/db.js';
import {
  SQL_GET_ALL_USERS,
  SQL_GET_USER_BY_ID,
  SQL_UPDATE_USER,
  SQL_DELETE_USER,
} from '../../controllers/user/sql.js';

export const findAllUsers = async () => {
  const result = await query(SQL_GET_ALL_USERS);
  return result.rows;
};

export const findUserById = async id => {
  const result = await query(SQL_GET_USER_BY_ID, [id]);
  return result.rows;
};

export const updateUserById = async (id, nombre_usuario) => {
  await query(SQL_UPDATE_USER, [nombre_usuario, id]);
  return { id_usuario: id, nombre_usuario };
};

export const deleteUserById = async id => {
  await query(SQL_DELETE_USER, [id]);
};
