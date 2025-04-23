import express from 'express';
import dotenv from 'dotenv';
import swaggerDocs from './config/swagger.js';
import roleRoutes from './routes/roleRoutes.js';
import shippingMethodsRoutes from './routes/shippingMethodsRouter.js';
import stagesRoutes from './routes/stagesRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import valueRoutes from './routes/valueRoutes.js'; 


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
swaggerDocs(app);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.use('/api/roles', roleRoutes);
app.use('/api/metodos-de-envio', shippingMethodsRoutes);
app.use('/api/estados', stagesRoutes); 
app.use('/api/usuarios', userRoutes);
app.use('/api/valores', valueRoutes);

app.listen(port, () => {
  console.log(`API available at http://localhost:${port}`);
});
