import { pool } from '../config/db.js';
import * as clientModel from '../models/clientModel.js';

export const getAllClients = async () => {
  return await clientModel.getAllClients();
};

export const getClientById = async cliente_id => {
  const clients = await clientModel.getClientById(cliente_id);

  if (clients.length === 0) {
    throw new Error('Cliente no encontrado');
  }

  return clients[0];
};

export const addClient = async clientData => {
  const { nombre, telefono, correo, direccion } = clientData;

  if (!nombre || !telefono) {
    throw new Error('Nombre y teléfono son campos requeridos');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existingClients = await clientModel.getClientByPhone(telefono);
    if (existingClients.length > 0) {
      throw new Error('El cliente ya está registrado');
    }

    const lastIds = await clientModel.getLastClientId();

    let nextNum = 1;
    if (lastIds.length > 0) {
      const lastId = lastIds[0].cliente_id;
      const lastNum = parseInt(lastId.substring(2), 10);
      nextNum = lastNum + 1;
    }

    const clienteId = `CL${nextNum.toString().padStart(3, '0')}`;

    const result = await clientModel.createClient(
      client,
      clienteId,
      nombre,
      telefono,
      correo || null,
      direccion || null,
    );

    await client.query('COMMIT');
    return {
      data: result[0],
      message: 'Cliente agregado correctamente',
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const updateClient = async (cliente_id, updateData) => {
  const { nombre, telefono, correo, direccion } = updateData;

  if (!nombre && !telefono && !correo && !direccion) {
    throw new Error('No se proporcionaron datos para actualizar');
  }

  const updates = [];
  const values = [];
  let paramCounter = 1;

  if (nombre !== undefined) {
    updates.push(`nombre = $${paramCounter}`);
    values.push(nombre);
    paramCounter++;
  }

  if (telefono !== undefined) {
    updates.push(`telefono = $${paramCounter}`);
    values.push(telefono);
    paramCounter++;
  }

  if (correo !== undefined) {
    updates.push(`correo = $${paramCounter}`);
    values.push(correo);
    paramCounter++;
  }

  if (direccion !== undefined) {
    updates.push(`direccion = $${paramCounter}`);
    values.push(direccion);
    paramCounter++;
  }

  values.push(cliente_id);

  const updateSQL = `UPDATE clientes SET ${updates.join(', ')} WHERE cliente_id = $${paramCounter} RETURNING *`;

  const updatedClients = await clientModel.updateClient(updateSQL, values);

  if (updatedClients.length === 0) {
    throw new Error('Cliente no encontrado');
  }

  return {
    data: updatedClients[0],
    message: 'Cliente actualizado correctamente',
  };
};

export const deleteClient = async cliente_id => {
  const deletedClients = await clientModel.deleteClient(cliente_id);

  if (deletedClients.length === 0) {
    throw new Error('Cliente no encontrado');
  }

  return {
    data: deletedClients[0],
    message: 'Cliente eliminado correctamente',
  };
};
