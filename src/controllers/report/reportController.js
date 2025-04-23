import {
  getOrdersByMonth as getOrdersByMonthService,
  getIncomeByMonth as getIncomeByMonthService,
  getPendingOrders as getPendingOrdersService,
  getRejectedOrders as getRejectedOrdersService,
  getOrdersOutOfTime as getOrdersOutOfTimeService,
  getBestSellingProductsHistory as getBestSellingProductsHistoryService,
  getInventory as getInventoryService,
  getProductionCapacity as getProductionCapacityService,
} from '../../services/report/reportService.js';

export const getOrdersByMonth = async (req, res) => {
  try {
    const { startDate, endDate, offset, limit } = req.query;
    const result = await getOrdersByMonthService(
      startDate,
      endDate,
      offset,
      limit,
    );
    res.success(result);
  } catch (error) {
    console.error('Error fetching orders by month:', error);
    res.error('Error al obtener pedidos realizados por mes');
  }
};

export const getIncomeByMonth = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await getIncomeByMonthService(startDate, endDate);
    res.success(result);
  } catch (error) {
    console.error('Error fetching income by month:', error);
    res.error('Error al obtener ingresos por mes');
  }
};

export const getPendingOrders = async (req, res) => {
  try {
    const { startDate, endDate, offset, limit } = req.query;
    const result = await getPendingOrdersService(
      startDate,
      endDate,
      offset,
      limit,
    );
    res.success(result);
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.error('Error al obtener pedidos pendientes');
  }
};

export const getRejectedOrders = async (req, res) => {
  try {
    const { startDate, endDate, offset, limit } = req.query;
    const result = await getRejectedOrdersService(
      startDate,
      endDate,
      offset,
      limit,
    );
    res.success(result);
  } catch (error) {
    console.error('Error fetching rejected orders:', error);
    res.error('Error al obtener pedidos rechazados');
  }
};

export const getOrdersOutOfTime = async (req, res) => {
  try {
    const { startDate, endDate, offset, limit } = req.query;
    const result = await getOrdersOutOfTimeService(
      startDate,
      endDate,
      offset,
      limit,
    );
    res.success(result);
  } catch (error) {
    console.error('Error fetching orders out of time:', error);
    res.error('Error al obtener pedidos fuera de tiempo');
  }
};

export const getBestSellingProductsHistory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await getBestSellingProductsHistoryService(
      startDate,
      endDate,
    );
    res.success(result);
  } catch (error) {
    console.error('Error fetching best selling products history:', error);
    res.error('Error al obtener historial de productos más vendidos');
  }
};

export const getInventory = async (req, res) => {
  try {
    const result = await getInventoryService();
    res.success(result);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.error('Error al obtener el inventario');
  }
};

export const getProductionCapacity = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await getProductionCapacityService(startDate, endDate);
    res.success(result);
  } catch (error) {
    console.error('Error fetching production capacity:', error);
    res.error('Error al obtener la capacidad de producción');
  }
};
