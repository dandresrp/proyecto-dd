import { query } from '../../config/db.js';

export const createLog = async (
  usuario_id,
  metodo,
  endpoint,
  descripcion,
  estatus_respuesta,
) => {
  try {
    const sql = `
      INSERT INTO bitacora
      (usuario_id, metodo, endpoint, descripcion, estatus_respuesta)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING bitacora_id
    `;

    const result = await query(sql, [
      usuario_id,
      metodo,
      endpoint,

      descripcion,
      estatus_respuesta,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error('Error en SQL al registrar en bitácora:', error.message);
    throw error;
  }
};
