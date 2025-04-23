import { getAllValues as getValues } from '../../services/value/valueService.js';

export const getAllValues = async (req, res) => {
  try {
    const values = await getValues();
    res.success(values);
  } catch (error) {
    console.error('Error al obtener valores:', error);
    res.error('Error al obtener valores');
  }
};
