import {
  getAllUsers as getUsers,
  getUserById as getUser,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from '../../services/userService.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.success(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.error('Error al obtener usuarios');
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const user = await getUser(id_usuario);
    res.success(user);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.error('Usuario no encontrado', 404);
    }
    console.error('Error al obtener usuario:', error);
    res.error('Error al obtener datos del usuario');
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { nombre_usuario } = req.body;
    const requestingUserId = req.usuario.id_usuario;

    const updatedUser = await updateUserService(
      id_usuario,
      nombre_usuario,
      requestingUserId,
    );
    res.success(updatedUser, 'Usuario actualizado correctamente');
  } catch (error) {
    if (error.statusCode === 400) {
      return res.error('El nombre de usuario es requerido', 400);
    }
    if (error.statusCode === 404) {
      return res.error('Usuario no encontrado', 404);
    }
    if (error.statusCode === 403) {
      return res.error('No tienes permiso para modificar este usuario', 403);
    }
    console.error('Error al actualizar usuario:', error);
    res.error('Error al actualizar usuario');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    await deleteUserService(id_usuario);
    res.success(null, 'Usuario eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.error('Error al eliminar usuario');
  }
};
