import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import redFlagsRoute from './routes/index';
import userAuthRoutes from './routes/userAuth';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to Ireporter',
}));

// middlewares
app.use('/api/v1/red-flags', redFlagsRoute);
app.use('/api/v1/auth', userAuthRoutes);

app.get('*', (req, res) => res.status(404).send({ message: 'Page not found. Please visit /api/v1' }));

const port = 9000;

app.listen(process.env.PORT || `${port}`, () => console.log(`Server started at localhost ${port}`));


export default app;
