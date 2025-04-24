import { query } from '../../config/db.js';

export const findUserByUsername = async nombre_usuario => {
  const result = await query(
    'SELECT * FROM usuarios WHERE nombre_usuario = $1',
    [nombre_usuario],
  );
  return result.rows;
};

export const findUserById = async usuario_id => {
  const result = await query('SELECT * FROM usuarios WHERE usuario_id = $1', [
    usuario_id,
  ]);
  return result.rows;
};

export const getRoleById = async rol_id => {
  const result = await query('SELECT nombre FROM rol WHERE rol_id = $1', [
    rol_id,
  ]);
  return result.rows;
};

export const getLastUserId = async prefix => {
  const result = await query(
    'SELECT usuario_id FROM usuarios WHERE usuario_id LIKE $1 ORDER BY usuario_id DESC LIMIT 1',
    [`${prefix}%`],
  );
  return result.rows;
};

export const createUser = async (
  usuario_id,
  nombre,
  correo,
  hashedPassword,
  rol,
  nombre_usuario,
) => {
  return await query(
    'INSERT INTO usuarios (usuario_id, nombre, correo, contrasena, rol, nombre_usuario) VALUES ($1, $2, $3, $4, $5, $6)',
    [usuario_id, nombre, correo, hashedPassword, rol, nombre_usuario],
  );
};

export const storeRefreshToken = async (token, usuario_id, expiryDate) => {
  return await query(
    'INSERT INTO refresh_tokens (token, usuario_id, expires_at) VALUES ($1, $2, $3) ON CONFLICT (usuario_id) DO UPDATE SET token = $1, expires_at = $3',
    [token, usuario_id, expiryDate],
  );
};

export const findRefreshToken = async (token, usuario_id) => {
  const result = await query(
    'SELECT * FROM refresh_tokens WHERE token = $1 AND usuario_id = $2 AND expires_at > NOW()',
    [token, usuario_id],
  );
  return result.rows;
};
