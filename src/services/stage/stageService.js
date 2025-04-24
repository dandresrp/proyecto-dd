import { findAllStages } from '../../models/stage/stageModel.js';

export const getAllStages = async () => {
  try {
    return await findAllStages();
  } catch (error) {
    console.error('Error in stage service (getAllStages):', error);
    throw error;
  }
};
