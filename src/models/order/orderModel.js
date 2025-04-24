import { query, pool } from '../../src/config/db.js';
import { SQL_GET_ALL_ORDERS, SQL_CREATE_ORDER, SQL_UPDATE_ORDER_STATUS } from '../../src/controllers/orders/sql.js';

export const findAllOrders = async (estado, nombre_cliente, pedido_id) => {
  const result = await query(SQL_GET_ALL_ORDERS, [
    estado,
    nombre_cliente,
    pedido_id,
  ]);
  return result.rows;
};

export const findOrderById = async id => {
  const result = await query('SELECT * FROM pedidos WHERE pedido_id = $1', [id]);
  return result.rows;
};

export const createNewOrder = async (
  pedido_id,
  cliente_id,
  usuario_id,
  notas,
  metodo_id,
  fecha_estimada_entrega,
  hora_estimada_entrega,
  detalles
) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    await client.query(SQL_CREATE_ORDER, [
      pedido_id,
      cliente_id,
      usuario_id,
      notas || null,
      metodo_id,
      fecha_estimada_entrega,
      hora_estimada_entrega,
      JSON.stringify(detalles)
    ]);
    
    const result = await client.query('SELECT * FROM pedidos WHERE pedido_id = $1', [pedido_id]);
    
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const updateOrderStatus = async (pedido_id, estado_id, estadoNombre) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const result = await client.query(SQL_UPDATE_ORDER_STATUS, [
      estado_id,
      estadoNombre,
      pedido_id
    ]);
    
    if (result.rows.length === 0) {
      throw new Error('Pedido no encontrado');
    }
    
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};