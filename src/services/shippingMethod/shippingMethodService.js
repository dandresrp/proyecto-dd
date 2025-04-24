import { findAllShippingMethods } from '../../models/shippingMethod/shippingMethodModel.js';

export const getAllShippingMethods = async () => {
  try {
    return await findAllShippingMethods();
  } catch (error) {
    console.error(
      'Error in shipping method service (getAllShippingMethods):',
      error,
    );
    throw error;
  }
};
