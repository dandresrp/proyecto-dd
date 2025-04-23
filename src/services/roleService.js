import { findAllRoles } from '../../src/models/roleModel.js';

export const getAllRoles = async () => {
  try {
    return await findAllRoles();
  } catch (error) {
    console.error('Error in role service (getAllRoles):', error);
    throw error;
  }
};
