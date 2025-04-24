import {
  findAllOrders,
  findOrderById,
  createNewOrder,
  updateOrderStatus as updateOrderStatusModel,
} from '../../models/orderModel.js';

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

// Add the new service method
export const createOrder = async (
  pedido_id,
  cliente_id,
  usuario_id,
  notas,
  metodo_id,
  fecha_estimada_entrega,
  hora_estimada_entrega,
  detalles,
) => {
  try {
    // Validate required fields
    if (
      !pedido_id ||
      !cliente_id ||
      !usuario_id ||
      !metodo_id ||
      !fecha_estimada_entrega ||
      !hora_estimada_entrega
    ) {
      const error = new Error('Datos incompletos para crear el pedido');
      error.statusCode = 400;
      throw error;
    }

    // Validate detalles format
    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      const error = new Error('Formato de detalles inválido');
      error.statusCode = 400;
      throw error;
    }

    // Check if all products have producto_id and cantidad
    for (const producto of detalles) {
      if (!producto.producto_id || !producto.cantidad) {
        const error = new Error('Formato de detalles inválido');
        error.statusCode = 400;
        throw error;
      }
    }

    return await createNewOrder(
      pedido_id,
      cliente_id,
      usuario_id,
      notas,
      metodo_id,
      fecha_estimada_entrega,
      hora_estimada_entrega,
      detalles,
    );
  } catch (error) {
    console.error('Error in order service (createOrder):', error);
    throw error;
  }
};

// Nuevo meodo para actualizar el estado del pedido
export const updateOrderStatus = async (pedido_id, estado_id) => {
  try {
    // Validar que el ID del pedido exista
    if (!pedido_id) {
      const error = new Error('ID del pedido es requerido');
      error.statusCode = 400;
      throw error;
    }

    // Validar que el estado sea válido
    if (!estado_id || isNaN(parseInt(estado_id))) {
      const error = new Error('Estado inválido');
      error.statusCode = 400;
      throw error;
    }

    // Verificar que el pedido exista
    const orders = await findOrderById(pedido_id);
    if (orders.length === 0) {
      const error = new Error('Pedido no encontrado');
      error.statusCode = 404;
      throw error;
    }

    // Obtener el nombre del estado para usar en la nota
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

    // Actualizar el estado
    return await updateOrderStatusModel(pedido_id, estado_id, estadoNombre);
  } catch (error) {
    console.error('Error in order service (updateOrderStatus):', error);
    throw error;
  }
};
