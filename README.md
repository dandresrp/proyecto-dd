
## Descripción General
Esta API RESTful desarrollada con Node.js y Express permite gestionar un sistema de pedidos, clientes, usuarios y generación de reportes. Implementa una arquitectura en capas (controladores, servicios, modelos) con autenticación JWT para proteger los endpoints.

## Estructura del Proyecto

```
API-REST-DD/
├── src/
│   ├── app.js                  # Punto de entrada de la aplicación
│   ├── config/                 # Configuraciones (base de datos, swagger)
│   ├── controllers/            # Controladores para cada entidad
│   ├── middlewares/            # Middlewares (autenticación, validación)
│   ├── models/                 # Modelos de datos y consultas a BD
│   ├── routes/                 # Definición de rutas de la API
│   ├── services/               # Lógica de negocio
│   └── utils/                  # Utilidades generales
├── .editorconfig               # Configuración del editor
├── .env.example                # Plantilla para variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── .prettierrc                 # Configuración de formato de código
└── package.json                # Dependencias y scripts
```

## Tecnologías Principales

- **Node.js**: Entorno de ejecución JavaScript
- **Express**: Framework para APIs REST
- **PostgreSQL**: Base de datos relacional
- **JWT**: Autenticación y autorización
- **Swagger**: Documentación de la API
- **bcryptjs**: Encriptación de contraseñas

## Requisitos del Sistema

- Node.js (v16+)
- PostgreSQL

## Instalación

1. Clone el repositorio:
   ```bash
   git clone https://github.com/dandresrp/proyecto-dd.git
   cd .\proyecto-dd\
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

3. Configure el archivo `.env` basado en `.env.example`:
   ```
   PORT=
   DATABASE_URL=
   JWT_SECRET=
   JWT_EXPIRES_IN=
   JWT_REFRESH_SECRET=
   JWT_REFRESH_EXPIRES_IN=
   ```

4. Inicie el servidor:
   ```bash
   npm run start
   ```

## Arquitectura

La aplicación está estructurada en capas:

1. **Rutas**: Definición de endpoints
2. **Controladores**: Manejo de peticiones HTTP
3. **Servicios**: Implementación de lógica de negocio
4. **Modelos**: Interacción con la base de datos

## Autenticación y Autorización

- JWT para gestión de sesiones
- Endpoint de login: `/api/auth/sign-in`
- Endpoint de registro: `/api/auth/sign-up` (solo admin)
- Endpoint para refrescar token: `/api/auth/refresh-token`
- Middleware de autenticación para rutas protegidas
- Control de acceso basado en roles (admin, usuario normal)

## API Endpoints

### Autenticación
- `POST /api/auth/sign-in`: Iniciar sesión
- `POST /api/auth/sign-up`: Registrar usuario (admin)
- `POST /api/auth/refresh-token`: Renovar token

### Usuarios
- `GET /api/usuarios`: Listar todos
- `GET /api/usuarios/{id}`: Obtener por ID
- `PUT /api/usuarios/{id}`: Actualizar
- `DELETE /api/usuarios/{id}`: Eliminar

### Clientes
- `GET /api/clientes`: Listar todos
- `GET /api/clientes/{id}`: Obtener por ID
- `POST /api/clientes`: Crear nuevo
- `PUT /api/clientes/{id}`: Actualizar
- `DELETE /api/clientes/{id}`: Eliminar

### Pedidos
- `GET /api/pedidos`: Listar todos (con filtros opcionales)

### Reportes
- `GET /api/reportes/orders-by-month`: Pedidos por mes
- `GET /api/reportes/income-by-month`: Ingresos por mes
- `GET /api/reportes/pending-orders`: Pedidos pendientes
- `GET /api/reportes/rejected-orders`: Pedidos rechazados
- `GET /api/reportes/orders-out-of-time`: Pedidos fuera de tiempo
- `GET /api/reportes/best-selling-products-history`: Productos más vendidos
- `GET /api/reportes/inventory`: Inventario actual
- `GET /api/reportes/production-capacity`: Capacidad de producción

### Datos Maestros
- `GET /api/roles`: Listar roles
- `GET /api/estados`: Listar estados
- `GET /api/metodos-de-envio`: Listar métodos de envío
- `GET /api/valores`: Listar valores

## Documentación de la API

La documentación interactiva está disponible en la ruta `/api/docs` con Swagger UI.

## Características Principales

- **Autenticación JWT** con sistema de refresh tokens
- **CRUD completo** para administración de clientes y usuarios
- **Reportes analíticos** de ventas, inventario y producción
- **Filtrado avanzado** de pedidos
- **Validación de datos** en todas las peticiones
- **Manejo consistente de errores**
- **Documentación integrada** con Swagger

## Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT con tiempo de expiración
- Sistema de refresh token
- Protección de rutas sensibles con autenticación
- Control de acceso basado en roles

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
