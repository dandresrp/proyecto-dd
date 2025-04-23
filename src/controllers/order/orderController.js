import * as orderService from '../../services/orderService.js';

export const createOrder = async (req, res) => {
  if (!req.body || !req.usuario) {
    return res.error('Datos de la solicitud incompletos', 400);
  }

  try {
    const result = await orderService.createOrder(
      req.body,
      req.usuario.id_usuario,
    );
    res.success({ id_pedido: result.id_pedido }, result.message, 201);
  } catch (error) {
    if (
      error.message === 'Faltan datos obligatorios o detalles del pedido' ||
      error.message === 'Faltan datos en los detalles del pedido' ||
      error.message === 'Usuario no autenticado'
    ) {
      return res.error(error.message, 400);
    }

    console.error('Error al crear el pedido:', error);
    res.error('Error al crear el pedido', 500);
  }
};

export const getOrderById = async (req, res) => {
  const { id_pedido } = req.params;

  try {
    const order = await orderService.getOrderDetails(id_pedido);
    res.success(order);
  } catch (error) {
    if (error.message === 'Pedido no encontrado') {
      return res.error('Pedido no encontrado', 404);
    }

    console.error('Error al obtener detalles del pedido:', error);
    res.error('Error al obtener detalles del pedido', 500);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.success(orders);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.error('Error al obtener pedidos', 500);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id_pedido } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.error('El estado es requerido', 400);
  }

  try {
    const result = await orderService.updateOrderStatus(id_pedido, estado);
    res.success(result.data, result.message);
  } catch (error) {
    if (error.message === 'Estado no válido') {
      return res.error('El estado proporcionado no es válido', 400);
    }
    if (error.message === 'Pedido no encontrado') {
      return res.error('Pedido no encontrado', 404);
    }

    console.error('Error al actualizar estado del pedido:', error);
    res.error('Error al actualizar estado del pedido', 500);
  }
};
