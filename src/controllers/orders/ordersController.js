import {
  getAllOrders as getOrders,
  getOrderById as getOrder,
} from '../../services/orderService.js';

export const getAllOrders = async (req, res) => {
  try {
    const { nombre_cliente, pedido_id, estado } = req.query;
    const orders = await getOrders(estado, nombre_cliente, pedido_id);
    res.success(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.error('Internal server error', 500);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrder(id);
    res.success(order);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.error('Order not found', 404);
    }
    console.error('Error fetching order:', error);
    res.error('Internal server error', 500);
  }
};
