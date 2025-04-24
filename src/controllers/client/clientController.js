import * as clientService from '../../services/client/clientService.js';

export const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.success(clients);
  } catch (error) {
    console.error('Error al obtener clientes: ', error);
    res.error('Error al obtener clientes', 500);
  }
};

export const getClientById = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const client = await clientService.getClientById(cliente_id);
    res.success(client);
  } catch (error) {
    if (error.message === 'Cliente no encontrado') {
      return res.error('Cliente no encontrado', 404);
    }
    console.error('Error al obtener este Cliente', error);
    res.error('Error al obtener datos de este cliente', 500);
  }
};

export const addClient = async (req, res) => {
  try {
    const result = await clientService.addClient(req.body);
    res.success(result.data, result.message, 201);
  } catch (error) {
    if (error.message === 'El cliente ya está registrado') {
      return res.error('El cliente ya está registrado', 400);
    }
    if (error.message === 'Nombre y teléfono son campos requeridos') {
      return res.error('Nombre y teléfono son campos requeridos', 400);
    }
    console.error('Error al agregar cliente:', error);
    res.error('Error al agregar cliente', 500);
  }
};

export const updateClient = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const result = await clientService.updateClient(cliente_id, req.body);
    res.success(result.data, result.message);
  } catch (error) {
    if (error.message === 'No se proporcionaron datos para actualizar') {
      return res.error('No se proporcionaron datos para actualizar', 400);
    }
    if (error.message === 'Cliente no encontrado') {
      return res.error('Cliente no encontrado', 404);
    }
    console.error('Error al actualizar cliente:', error);
    res.error('Error al actualizar cliente', 500);
  }
};

export const deleteClient = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    const result = await clientService.deleteClient(cliente_id);
    res.success(result.data, result.message);
  } catch (error) {
    if (error.message === 'Cliente no encontrado') {
      return res.error('Cliente no encontrado', 404);
    }
    console.error('Error al eliminar cliente:', error);
    res.error('Error al eliminar cliente', 500);
  }
};
