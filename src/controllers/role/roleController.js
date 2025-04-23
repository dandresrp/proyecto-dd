import { getAllRoles as getRoles } from '../../services/roleService.js';

export const getAllRoles = async (req, res) => {
  try {
    const roles = await getRoles();
    res.success(roles);
  } catch (error) {
    console.error('Error al obtener roles: ', error);
    res.error('Error al obtener roles');
  }
};
