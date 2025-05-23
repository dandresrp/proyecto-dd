import { findAllValues } from '../../models/value/valueModel.js';

export const getAllValues = async () => {
  try {
    return await findAllValues();
  } catch (error) {
    console.error('Error in value service (getAllValues):', error);
    throw error;
  }
};
