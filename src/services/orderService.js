import { pool } from '../config/db.js';
import * as orderModel from '../models/orderModel.js';

export const createOrder = async (orderData, usuario_id) => {
  const { id_cliente, notas, fecha_estimada_entrega, metodo_envio, detalles } =
    orderData;

  if (!id_cliente || !detalles || detalles.length === 0) {
    throw new Error('Faltan datos obligatorios o detalles del pedido');
  }

  if (!usuario_id) {
    throw new Error('Usuario no autenticado');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const pedidoResult = await orderModel.createOrder(
      client,
      id_cliente,
      usuario_id,
      notas || null,
      fecha_estimada_entrega || null,
      metodo_envio || 'Recogida en tienda',
    );

    if (!pedidoResult || pedidoResult.length === 0) {
      throw new Error('Error al obtener el ID del pedido creado');
    }

    const id_pedido = pedidoResult[0].id_pedido;

    for (const detalle of detalles) {
      const { id_producto, cantidad } = detalle;

      if (!id_producto || !cantidad) {
        throw new Error('Faltan datos en los detalles del pedido');
      }

      await orderModel.createOrderDetail(
        client,
        id_pedido,
        id_producto,
        cantidad,
      );
    }

    await client.query('COMMIT');

    return {
      id_pedido,
      message: 'Pedido creado exitosamente',
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getOrderDetails = async id_pedido => {
  const orderData = await orderModel.getOrderById(id_pedido);

  if (!orderData || orderData.length === 0) {
    throw new Error('Pedido no encontrado');
  }

  const orderDetails = await orderModel.getOrderDetailsByOrderId(id_pedido);

  return {
    ...orderData[0],
    detalles: orderDetails,
  };
};

export const getAllOrders = async () => {
  return await orderModel.getAllOrders();
};

export const updateOrderStatus = async (id_pedido, estado) => {
  const validStatus = ['pendiente', 'en proceso', 'completado', 'cancelado'];

  if (!validStatus.includes(estado)) {
    throw new Error('Estado no válido');
  }

  const updatedOrder = await orderModel.updateOrderStatus(id_pedido, estado);

  if (!updatedOrder || updatedOrder.length === 0) {
    throw new Error('Pedido no encontrado');
  }

  return {
    data: updatedOrder[0],
    message: 'Estado del pedido actualizado correctamente',
  };
};
