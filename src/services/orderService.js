import {
  findAllOrders,
  findOrderById,
} from '../../models/orders/orderModel.js';

export const getAllOrders = async (estado, nombre_cliente, pedido_id) => {
  try {
    return await findAllOrders(estado, nombre_cliente, pedido_id);
  } catch (error) {
    console.error('Error in order service (getAllOrders):', error);
    throw error;
  }
};

export const getOrderById = async id => {
  try {
    const orders = await findOrderById(id);
    if (orders.length === 0) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return orders[0];
  } catch (error) {
    console.error('Error in order service (getOrderById):', error);
    throw error;
  }
};
