import express from 'express';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth.js';
import * as ordersController from '../controllers/orders/ordersController.js';

const router = express.Router();

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         description: Filtrar pedidos por estado
 *         schema:
 *           type: string
 *       - in: query
 *         name: nombre_cliente
 *         description: Filtrar pedidos por nombre cliente
 *         schema:
 *           type: string
 *       - in: query
 *         name: pedido_id
 *         description: Filtrar pedidos por ID de pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', authenticateJWT, ordersController.getAllOrders);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtiene un pedido por su ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del pedido
 *       404:
 *         description: Pedido no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', authenticateJWT, ordersController.getOrderById);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedido_id:
 *                 type: string
 *                 description: ID único del pedido
 *               cliente_id:
 *                 type: string
 *                 description: ID del cliente
 *               usuario_id:
 *                 type: string
 *                 description: ID del usuario que crea el pedido
 *               notas:
 *                 type: string
 *                 description: Notas adicionales del pedido
 *               metodo_id:
 *                 type: integer
 *                 description: ID del método de envío
 *               fecha_estimada_entrega:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada de entrega (YYYY-MM-DD)
 *               hora_estimada_entrega:
 *                 type: string
 *                 description: Hora estimada de entrega (HH:MM:SS)
 *               detalles:
 *                 type: array
 *                 description: Detalles de los productos del pedido
 *                 items:
 *                   type: object
 *                   properties:
 *                     producto_id:
 *                       type: string
 *                       description: ID del producto
 *                     cantidad:
 *                       type: integer
 *                       description: Cantidad del producto
 *                     especificaciones:
 *                       type: object
 *                       description: Especificaciones del producto (clave-valor)
 *             required:
 *               - pedido_id
 *               - cliente_id
 *               - metodo_id
 *               - fecha_estimada_entrega
 *               - hora_estimada_entrega
 *               - detalles
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente o producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authenticateJWT, ordersController.createOrder);

export default router;