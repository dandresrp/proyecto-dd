import * as authService from '../../services/auth/authService.js';

export const signUp = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.success(result.message, 201);
  } catch (error) {
    if (error.message === 'Todos los campos son requeridos') {
      return res.error('Todos los campos son requeridos', 400);
    }
    if (error.message === 'La contraseña debe tener al menos 10 caracteres') {
      return res.error('La contraseña debe tener al menos 10 caracteres', 400);
    }
    if (error.message === 'El usuario ya existe') {
      return res.error('El nombre de usuario ya está registrado', 400);
    }
    if (error.message === 'Rol no válido') {
      return res.error('El rol seleccionado no es válido', 400);
    }

    console.error('Error en el registro:', error);
    res.error(
      'Error al registrar el usuario. Por favor, inténtelo de nuevo más tarde.',
      500,
    );
  }
};

export const signIn = async (req, res) => {
  try {
    const authData = await authService.authenticateUser(req.body);
    res.success(authData);
  } catch (error) {
    if (error.message === 'Usuario y contraseña son requeridos') {
      return res.error('Usuario y contraseña son requeridos', 400);
    }
    if (error.message === 'Usuario o contraseña incorrectos') {
      return res.error('Usuario o contraseña incorrectos', 400);
    }

    console.error('Error en el inicio de sesión:', error);
    res.error('Error al iniciar sesión', 500);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const result = await authService.refreshUserToken(req.body.refreshToken);
    res.success(result);
  } catch (error) {
    if (error.message === 'Refresh token es requerido') {
      return res.error('Refresh token es requerido', 400);
    }
    if (error.message === 'Refresh token inválido o expirado') {
      return res.error('Refresh token inválido o expirado', 401);
    }
    if (error.message === 'Usuario no encontrado') {
      return res.error('Usuario no encontrado', 404);
    }
    if (error.name === 'JsonWebTokenError') {
      return res.error('Token inválido', 401);
    }

    console.error('Error al refrescar token:', error);
    res.error('Error al refrescar token', 401);
  }
};
