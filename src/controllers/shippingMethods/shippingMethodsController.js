import { getAllShippingMethods as getShippingMethods } from '../../services/shippingMethod/shippingMethodService.js';

export const getAllShippingMethods = async (req, res) => {
  try {
    const shippingMethods = await getShippingMethods();
    res.success(shippingMethods);
  } catch (error) {
    console.error('Error al obtener métodos de envío:', error);
    res.error('Error al obtener métodos de envío');
  }
};
