import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../config/db.js';
import * as authModel from '../../models/auth/authModel.js';

export const registerUser = async userData => {
  const { nombre, nombre_usuario, rol, correo, contrasena } = userData;

  if (!nombre || !nombre_usuario || !rol || !correo || !contrasena) {
    throw new Error('Todos los campos son requeridos');
  }

  if (contrasena.length < 10) {
    throw new Error('La contraseña debe tener al menos 10 caracteres');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existingUsers = await authModel.findUserByUsername(nombre_usuario);
    if (existingUsers.length > 0) {
      throw new Error('El usuario ya existe');
    }

    const roles = await authModel.getRoleById(rol);
    if (roles.length === 0) {
      throw new Error('Rol no válido');
    }

    const rolNombre = roles[0].nombre;
    const rolPrefix = rolNombre.charAt(0).toUpperCase();

    const lastIds = await authModel.getLastUserId(rolPrefix);

    let nextNum = 1;
    if (lastIds.length > 0) {
      const lastId = lastIds[0].usuario_id;
      const lastNum = parseInt(lastId.substring(1), 10);
      nextNum = lastNum + 1;
    }

    const nextId = `${rolPrefix}${nextNum.toString().padStart(3, '0')}`;

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await authModel.createUser(
      nextId,
      nombre,
      correo,
      hashedPassword,
      rol,
      nombre_usuario,
    );

    await client.query('COMMIT');
    return { success: true, message: 'Usuario registrado exitosamente' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const authenticateUser = async credentials => {
  const { nombre_usuario, contrasena } = credentials;

  if (!nombre_usuario || !contrasena) {
    throw new Error('Usuario y contraseña son requeridos');
  }

  const users = await authModel.findUserByUsername(nombre_usuario);

  if (users.length === 0) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const usuario = users[0];

  const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!isPasswordValid) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const token = generateAccessToken(usuario);
  const refreshToken = generateRefreshToken(usuario.usuario_id);

  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await authModel.storeRefreshToken(
    refreshToken,
    usuario.usuario_id,
    expiryDate,
  );

  return {
    token,
    refreshToken,
    usuario_id: usuario.usuario_id,
  };
};

export const refreshUserToken = async token => {
  if (!token) {
    throw new Error('Refresh token es requerido');
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const tokens = await authModel.findRefreshToken(token, decoded.usuario_id);
  if (tokens.length === 0) {
    throw new Error('Refresh token inválido o expirado');
  }

  const users = await authModel.findUserById(decoded.usuario_id);
  if (users.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const usuario = users[0];

  const newToken = generateAccessToken(usuario);

  return {
    message: 'Token actualizado exitosamente',
    token: newToken,
  };
};

function generateAccessToken(usuario) {
  return jwt.sign(
    {
      nombre_usuario: usuario.nombre_usuario,
      usuario_id: usuario.usuario_id,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
}

function generateRefreshToken(usuario_id) {
  return jwt.sign({ usuario_id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
}
