import { findAllRoles } from '../../models/rolseModel.js';

export const getAllRoles = async () => {
  try {
    return await findAllRoles();
  } catch (error) {
    console.error('Error in role service (getAllRoles):', error);
    throw error;
  }
};
