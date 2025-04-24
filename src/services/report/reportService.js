import {
  findOrdersByMonth,
  findIncomeByMonth,
  findPendingOrders,
  findRejectedOrders,
  findOrdersOutOfTime,
  findBestSellingProductsHistory,
  findInventory,
  findProductionCapacity,
} from '../../models/report/reportModel.js';

export const getOrdersByMonth = async (startDate, endDate, offset, limit) => {
  try {
    return await findOrdersByMonth(startDate, endDate, offset, limit);
  } catch (error) {
    console.error('Error in report service (getOrdersByMonth):', error);
    throw error;
  }
};

export const getIncomeByMonth = async (startDate, endDate) => {
  try {
    const result = await findIncomeByMonth(startDate, endDate);

    return result.map(row => {
      const date = new Date(row.month);
      const monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      return {
        ...row,
        month: formattedDate,
      };
    });
  } catch (error) {
    console.error('Error in report service (getIncomeByMonth):', error);
    throw error;
  }
};

export const getPendingOrders = async (startDate, endDate, offset, limit) => {
  try {
    return await findPendingOrders(startDate, endDate, offset, limit);
  } catch (error) {
    console.error('Error in report service (getPendingOrders):', error);
    throw error;
  }
};

export const getRejectedOrders = async (startDate, endDate, offset, limit) => {
  try {
    return await findRejectedOrders(startDate, endDate, offset, limit);
  } catch (error) {
    console.error('Error in report service (getRejectedOrders):', error);
    throw error;
  }
};

export const getOrdersOutOfTime = async (startDate, endDate, offset, limit) => {
  try {
    return await findOrdersOutOfTime(startDate, endDate, offset, limit);
  } catch (error) {
    console.error('Error in report service (getOrdersOutOfTime):', error);
    throw error;
  }
};

export const getBestSellingProductsHistory = async (startDate, endDate) => {
  try {
    const result = await findBestSellingProductsHistory(startDate, endDate);
    if (result.length === 0) {
      return 'No se encontraron productos vendidos en el rango de fechas seleccionado';
    }
    return result;
  } catch (error) {
    console.error(
      'Error in report service (getBestSellingProductsHistory):',
      error,
    );
    throw error;
  }
};

export const getInventory = async () => {
  try {
    return await findInventory();
  } catch (error) {
    console.error('Error in report service (getInventory):', error);
    throw error;
  }
};

export const getProductionCapacity = async (startDate, endDate) => {
  try {
    const result = await findProductionCapacity(startDate, endDate);

    return result.map(row => {
      const date = new Date(row.mes);
      const monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      return {
        ...row,
        mes: formattedDate,
      };
    });
  } catch (error) {
    console.error('Error in report service (getProductionCapacity):', error);
    throw error;
  }
};
