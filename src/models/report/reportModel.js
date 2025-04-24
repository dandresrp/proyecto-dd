import { query } from '../../src/config/db.js';
import {
  SQL_GET_INCOME_BY_MONTH,
  SQL_GET_ORDERS_BY_MONTH,
  SQL_GET_PENDING_ORDERS,
  SQL_GET_REJECTED_ORDERS,
  SQL_GET_ORDERS_OUT_OF_TIME,
  SQL_GET_BEST_SELLING_PRODUCTS_HISTORY,
  SQL_GET_INVENTORY,
  SQL_GET_PRODUCTION_CAPACITY,
} from '../../src/controllers/report/sql.js';

export const findOrdersByMonth = async (startDate, endDate, offset, limit) => {
  const result = await query(SQL_GET_ORDERS_BY_MONTH, [
    startDate || null,
    endDate || null,
    offset || null,
    limit || null,
  ]);
  return result.rows;
};

export const findIncomeByMonth = async (startDate, endDate) => {
  const result = await query(SQL_GET_INCOME_BY_MONTH, [
    startDate || null,
    endDate || null,
  ]);
  return result.rows;
};

export const findPendingOrders = async (startDate, endDate, offset, limit) => {
  const result = await query(SQL_GET_PENDING_ORDERS, [
    startDate || null,
    endDate || null,
    offset || null,
    limit || null,
  ]);
  return result.rows;
};

export const findRejectedOrders = async (startDate, endDate, offset, limit) => {
  const result = await query(SQL_GET_REJECTED_ORDERS, [
    startDate || null,
    endDate || null,
    offset || null,
    limit || null,
  ]);
  return result.rows;
};

export const findOrdersOutOfTime = async (
  startDate,
  endDate,
  offset,
  limit,
) => {
  const result = await query(SQL_GET_ORDERS_OUT_OF_TIME, [
    startDate || null,
    endDate || null,
    offset || null,
    limit || null,
  ]);
  return result.rows;
};

export const findBestSellingProductsHistory = async (startDate, endDate) => {
  const result = await query(SQL_GET_BEST_SELLING_PRODUCTS_HISTORY, [
    startDate || null,
    endDate || null,
  ]);
  return result.rows;
};

export const findInventory = async () => {
  const result = await query(SQL_GET_INVENTORY);
  return result.rows;
};

export const findProductionCapacity = async (startDate, endDate) => {
  const result = await query(SQL_GET_PRODUCTION_CAPACITY, [
    startDate || null,
    endDate || null,
  ]);
  return result.rows;
};
