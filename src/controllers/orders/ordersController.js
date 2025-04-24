import {
  getAllOrders as getOrders,
  getOrderById as getOrder,
  createOrder as createNewOrder,
  updateOrderStatus as updateOrderState, // Nueva importación
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

export const createOrder = async (req, res) => {
  try {
    const { 
      pedido_id, 
      cliente_id, 
      usuario_id, 
      notas, 
      metodo_id, 
      fecha_estimada_entrega, 
      hora_estimada_entrega, 
      detalles 
    } = req.body;
    
    const newOrder = await createNewOrder(
      pedido_id,
      cliente_id,
      usuario_id || req.usuario.usuario_id, 
      notas,
      metodo_id,
      fecha_estimada_entrega,
      hora_estimada_entrega,
      detalles
    );
    
    res.success(newOrder, 'Pedido creado exitosamente', 201);
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.message === 'Datos incompletos para crear el pedido') {
      return res.error('Faltan datos requeridos para crear el pedido', 400);
    }
    if (error.message === 'Formato de detalles inválido') {
      return res.error('El formato de los detalles del pedido es inválido', 400);
    }
    if (error.message === 'Cliente no encontrado') {
      return res.error('El cliente especificado no existe', 404);
    }
    if (error.message === 'Producto no encontrado') {
      return res.error('Uno o más productos especificados no existen', 404);
    }
    res.error('Error al crear el pedido', 500);
  }
};

// Nuevo método para actualizar el estado del pedido
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