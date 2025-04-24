export const SQL_GET_ALL_ORDERS = `
  SELECT p.pedido_id, c.nombre AS cliente, e.nombre AS estado, p.total, p.fecha_creacion, p.fecha_estimada_entrega
  FROM pedidos p
          JOIN clientes c ON p.cliente_id = c.cliente_id
          JOIN public.estados e ON e.estado_id = p.estado_id
  WHERE e.nombre = COALESCE($1, e.nombre)
    AND ($2::text IS NULL OR c.nombre ILIKE '%' || $2 || '%')
    AND ($3::text IS NULL OR CAST(p.pedido_id AS TEXT) LIKE '%' || $3 || '%');
`;

export const SQL_CREATE_ORDER = `
  INSERT INTO public.pedidos (
        pedido_id,
        cliente_id,
        usuario_id,
        notas,
        estado_id,
        total,
        fecha_creacion,
        fecha_modificacion,
        fecha_finalizacion,
        fecha_estimada_entrega,
        metodo_id,
        hora_estimada_entrega
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL,
        $7, $8, $9
      ) RETURNING *
`;

export const SQL_UPDATE_ORDER_STATUS = `
  UPDATE public.pedidos
  SET
    estado_id = $1,
    fecha_modificacion = CURRENT_TIMESTAMP,
    fecha_finalizacion = CASE
                          WHEN $1 = 5 THEN CURRENT_TIMESTAMP
                          ELSE fecha_finalizacion
                         END,
    notas = COALESCE(notas, '') || E'\n[' || CURRENT_DATE || '] Cambio de estado: ' || $2
  WHERE
    pedido_id = $3
  RETURNING *;
`;
