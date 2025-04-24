import {
  getAllOrders as getOrders,
  getOrderById as getOrder,
  createOrder as createNewOrder,
  updateOrderStatus as updateOrderState, // Nueva importación
} from '../../services/order/orderService.js';

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

export const createOrder = async (req, res) => {
  try {
    if (!req.usuario || !req.usuario.usuario_id) {
      return res.error('Unauthorized', 401);
    }

    const orderData = req.body;

    const newOrder = await createNewOrder(orderData, req.usuario.usuario_id);

    res.success(newOrder, 'Pedido creado correctamente', 201);
  } catch (error) {
    if (error.statusCode) {
      return res.error(error.message, error.statusCode);
    }
    console.error('Error creating order:', error);
    res.error('Error al crear el pedido', 500);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_id } = req.body;

    const updatedOrder = await updateOrderState(id, estado_id);

    res.success(updatedOrder, 'Estado del pedido actualizado exitosamente');
  } catch (error) {
    console.error('Error updating order status:', error);
    if (error.message === 'ID del pedido es requerido') {
      return res.error('ID del pedido es requerido', 400);
    }
    if (error.message === 'Estado inválido') {
      return res.error('Estado inválido', 400);
    }
    if (error.message === 'Pedido no encontrado') {
      return res.error('Pedido no encontrado', 404);
    }
    res.error('Error al actualizar estado del pedido', 500);
  }
};
