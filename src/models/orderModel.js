import { query } from '../../src/config/db.js';
import { SQL_GET_ALL_ORDERS } from '../../src/controllers/orders/sql.js';

export const findAllOrders = async (estado, nombre_cliente, pedido_id) => {
  const result = await query(SQL_GET_ALL_ORDERS, [
    estado,
    nombre_cliente,
    pedido_id,
  ]);
  return result.rows;
};

export const findOrderById = async id => {
  const result = await query('SELECT * FROM pedidos WHERE id = $1', [id]);
  return result.rows;
};
