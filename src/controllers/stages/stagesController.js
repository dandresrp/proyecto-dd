import { getAllStages as getStages } from '../../services/stageService.js';

export const getAllStages = async (req, res) => {
  try {
    const stages = await getStages();
    res.success(stages);
  } catch (error) {
    console.error('Error al obtener estados:', error);
    res.error('Error al obtener estados');
  }
};
