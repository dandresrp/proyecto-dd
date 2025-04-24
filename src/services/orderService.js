import { findAllOrders, findOrderById, createNewOrder } from '../../src/models/orderModel.js';

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
  detalles
) => {
  try {
    // Validate required fields
    if (!pedido_id || !cliente_id || !usuario_id || !metodo_id || !fecha_estimada_entrega || !hora_estimada_entrega) {
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
      detalles
    );
  } catch (error) {
    console.error('Error in order service (createOrder):', error);
    throw error;
  }
};