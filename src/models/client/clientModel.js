import { query } from '../../config/db.js';

export const getAllClients = async () => {
  const result = await query('SELECT * FROM clientes ORDER BY nombre');
  return result.rows;
};

export const getClientById = async cliente_id => {
  const result = await query('SELECT * FROM clientes WHERE cliente_id = $1', [
    cliente_id,
  ]);
  return result.rows;
};

export const getClientByPhone = async telefono => {
  const result = await query('SELECT * FROM clientes WHERE telefono = $1', [
    telefono,
  ]);
  return result.rows;
};

export const getLastClientId = async () => {
  const result = await query(
    'SELECT cliente_id FROM clientes WHERE cliente_id LIKE $1 ORDER BY cliente_id DESC LIMIT 1',
    ['CL%'],
  );
  return result.rows;
};

export const createClient = async (
  client,
  clienteId,
  nombre,
  telefono,
  correo,
  direccion,
) => {
  const insertQuery =
    'INSERT INTO clientes (cliente_id, nombre, telefono, correo, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const result = await client.query(insertQuery, [
    clienteId,
    nombre,
    telefono,
    correo,
    direccion,
  ]);
  return result.rows;
};

export const updateClient = async (updates, values) => {
  const result = await query(updates, values);
  return result.rows;
};

export const deleteClient = async cliente_id => {
  const result = await query(
    'DELETE FROM clientes WHERE cliente_id = $1 RETURNING *',
    [cliente_id],
  );
  return result.rows;
};
