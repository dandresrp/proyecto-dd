import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerDocs from './config/swagger.js';
import authRoutes from './routes/auth/authRoutes.js';
import clientRoutes from './routes/client/clientRoutes.js';
import orderRoutes from './routes/order/orderRoutes.js';
import reportRoutes from './routes/report/reportRoutes.js';
import roleRoutes from './routes/role/roleRoutes.js';
import shippingMethodsRoutes from './routes/shippingMethod/shippingMethodsRouter.js';
import stagesRoutes from './routes/stages/stagesRoutes.js';
import userRoutes from './routes/user/userRoutes.js';
import valueRoutes from './routes/value/valueRoutes.js';
import { responseHandler } from './middlewares/responseHandler.js';
import { logger } from './middlewares/log.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(responseHandler);
app.use(logger);
swaggerDocs(app);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/clientes', clientRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/reportes', reportRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/metodos-de-envio', shippingMethodsRoutes);
app.use('/api/estados', stagesRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/valores', valueRoutes);

app.listen(port, () => {
  console.log(`API available at http://localhost:${port}`);
});
