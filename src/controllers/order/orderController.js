import { query } from '../../config/database/db.js';

export const createOrder = async (req, res) => {
    if (!req.body || !req.usuario) {
        return res.status(400).json({
            success: false,
            data: 'Datos de la solicitud incompletos',
        });
    }

    const { id_cliente, notas, fecha_estimada_entrega, metodo_envio, detalles } = req.body;
    const id_usuario_recepcion = req.usuario?.id_usuario; // Validar que req.usuario tenga id_usuario

    try {
        // Validación básica
        if (!id_cliente || !detalles || detalles.length === 0) {
            return res.status(400).json({
                success: false,
                data: 'Faltan datos obligatorios o detalles del pedido',
            });
        }

        if (!id_usuario_recepcion) {
            return res.status(400).json({
                success: false,
                data: 'Usuario no autenticado',
            });
        }

        // Inicia una transacción
        await query('BEGIN');

        // Inserta en la tabla pedidos
        const insertPedidoQuery = `
            INSERT INTO pedidos (id_cliente, id_usuario_recepcion, notas, fecha_estimada_entrega, metodo_envio)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id_pedido
        `;
        const pedidoResult = await query(insertPedidoQuery, [
            id_cliente,
            id_usuario_recepcion,
            notas,
            fecha_estimada_entrega,
            metodo_envio,
        ]);

        if (!pedidoResult.rows || !Array.isArray(pedidoResult.rows) || pedidoResult.rows.length === 0) {
            await query('ROLLBACK');
            return res.status(500).json({
                success: false,
                data: 'Error al obtener el ID del pedido creado',
            });
        }

        const id_pedido = pedidoResult.rows[0]?.id_pedido;

        if (!id_pedido) {
            await query('ROLLBACK');
            return res.status(500).json({
                success: false,
                data: 'El ID del pedido no está disponible',
            });
        }

        // Inserta en la tabla detallespedido
        const insertDetalleQuery = `
            INSERT INTO detallespedido (id_pedido, id_producto, cantidad)
            VALUES ($1, $2, $3)
        `;

        for (const detalle of detalles) {
            const { id_producto, cantidad } = detalle;

            // Validación básica para cada detalle
            if (!id_producto || !cantidad) {
                await query('ROLLBACK');
                return res.status(400).json({
                    success: false,
                    data: 'Faltan datos en los detalles del pedido',
                });
            }

            await query(insertDetalleQuery, [id_pedido, id_producto, cantidad]);
        }

        // Confirma la transacción
        await query('COMMIT');

        res.status(201).json({
            success: true,
            data: 'Pedido creado exitosamente',
            pedido: { id_pedido },
        });
    } catch (err) {
        // Si ocurre un error, deshace la transacción
        await query('ROLLBACK');
        console.error('Error al crear el pedido:', err);
        res.status(500).json({
            success: false,
            data: 'Error al crear el pedido',
        });
    }
};
