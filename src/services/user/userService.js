import {
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from '../../models/user/userModel.js';

export const getAllUsers = async () => {
  try {
    return await findAllUsers();
  } catch (error) {
    console.error('Error in user service (getAllUsers):', error);
    throw error;
  }
};

export const getUserById = async id => {
  try {
    const users = await findUserById(id);
    if (users.length === 0) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return users[0];
  } catch (error) {
    console.error('Error in user service (getUserById):', error);
    throw error;
  }
};

export const updateUser = async (id, nombre_usuario, requestingUserId) => {
  try {
    if (!nombre_usuario || nombre_usuario.trim() === '') {
      const error = new Error('El nombre de usuario es requerido');
      error.statusCode = 400;
      throw error;
    }

    const users = await findUserById(id);
    if (users.length === 0) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (requestingUserId != id) {
      const error = new Error('No tienes permiso para modificar este usuario');
      error.statusCode = 403;
      throw error;
    }

    return await updateUserById(id, nombre_usuario);
  } catch (error) {
    console.error('Error in user service (updateUser):', error);
    throw error;
  }
};

export const deleteUser = async id => {
  try {
    await deleteUserById(id);
  } catch (error) {
    console.error('Error in user service (deleteUser):', error);
    throw error;
  }
};
