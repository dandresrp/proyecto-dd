import { createLog } from '../models/logModel.js';

export const logger = (req, res, next) => {
  let statusCode;
  let logRegistered = false;

  const metodo = req.method;
  const endpoint = req.originalUrl;

  let descripcion = '';
  if (req.method === 'GET') {
    descripcion = `Consulta de ${endpoint}`;
  } else if (req.method === 'POST') {
    descripcion = `Creación en ${endpoint}`;
    if (req.body && Object.keys(req.body).length > 0) {
      descripcion += ` con datos: ${filtrarDatosSensibles(req.body)}`;
    }
  } else if (req.method === 'PUT' || req.method === 'PATCH') {
    descripcion = `Actualización en ${endpoint}`;
    if (req.body && Object.keys(req.body).length > 0) {
      descripcion += ` con datos: ${filtrarDatosSensibles(req.body)}`;
    }
  } else if (req.method === 'DELETE') {
    descripcion = `Eliminación en ${endpoint}`;
  }

  function filtrarDatosSensibles(body) {
    if (!body) return '';
    const datosSeguro = { ...body };
    if (datosSeguro.password) datosSeguro.password = '[REDACTED]';
    if (datosSeguro.contraseña) datosSeguro.contraseña = '[REDACTED]';
    return JSON.stringify(datosSeguro);
  }

  res.on('finish', () => {
    if (logRegistered) return;
    logRegistered = true;

    const usuario_id = req.usuario?.usuario_id || 'No autenticado';
    statusCode = res.statusCode;

    createLog(usuario_id, metodo, endpoint, descripcion, statusCode).catch(
      error => {
        console.error('Error al registrar en bitácora:', error);
      },
    );
  });

  next();
};
