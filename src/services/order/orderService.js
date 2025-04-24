import {
  findAllOrders,
  findOrderById,
  createNewOrder,
  updateOrderStatus as updateOrderStatusModel,
} from '../../models/order/orderModel.js';

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

export const createOrder = async (orderData, usuario_id) => {
  try {
    if (!orderData.cliente_id) {
      const error = new Error('El cliente es requerido');
      error.statusCode = 400;
      throw error;
    }

    if (
      !orderData.total ||
      isNaN(parseFloat(orderData.total)) ||
      parseFloat(orderData.total) <= 0
    ) {
      const error = new Error('El total debe ser un número positivo');
      error.statusCode = 400;
      throw error;
    }

    const currentYear = new Date().getFullYear();
    const orderNumber = Math.floor(10000 + Math.random() * 90000);
    const pedido_id = `PED-${currentYear}-${orderNumber.toString().padStart(5, '0')}`;

    const estado_id = orderData.estado_id || 1;

    let fecha_estimada_entrega = orderData.fecha_estimada_entrega;
    if (!fecha_estimada_entrega) {
      const date = new Date();
      date.setDate(date.getDate() + 5);
      fecha_estimada_entrega = date.toISOString().split('T')[0];
    }

    const newOrder = await createNewOrder(
      pedido_id,
      orderData.cliente_id,
      usuario_id,
      orderData.notas || '',
      estado_id,
      parseFloat(orderData.total),
      fecha_estimada_entrega,
      orderData.metodo_id || 1,
      orderData.hora_estimada_entrega || '12:00:00',
    );

    return newOrder;
  } catch (error) {
    console.error('Error in order service (createOrder):', error);
    throw error;
  }
};

export const updateOrderStatus = async (pedido_id, estado_id) => {
  try {
    if (!pedido_id) {
      const error = new Error('ID del pedido es requerido');
      error.statusCode = 400;
      throw error;
    }

    if (!estado_id || isNaN(parseInt(estado_id))) {
      const error = new Error('Estado inválido');
      error.statusCode = 400;
      throw error;
    }

    const orders = await findOrderById(pedido_id);
    if (orders.length === 0) {
      const error = new Error('Pedido no encontrado');
      error.statusCode = 404;
      throw error;
    }

    let estadoNombre;
    switch (parseInt(estado_id)) {
      case 1:
        estadoNombre = 'Creado';
        break;
      case 2:
        estadoNombre = 'En Produccion';
        break;
      case 3:
        estadoNombre = 'En Espera';
        break;
      case 4:
        estadoNombre = 'En Envio';
        break;
      case 5:
        estadoNombre = 'Finalizado';
        break;
      case 6:
        estadoNombre = 'Rechazado';
        break;
      default:
        estadoNombre = 'Cambio de estado';
    }

    return await updateOrderStatusModel(pedido_id, estado_id, estadoNombre);
  } catch (error) {
    console.error('Error in order service (updateOrderStatus):', error);
    throw error;
  }
};
