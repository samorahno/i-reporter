import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import IncidentRoute from './routes/index';
import userAuthRoutes from './routes/userAuth';


dotenv.config();
const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to Ireporter',
}));


app.use('/api/v1', IncidentRoute);
app.use('/api/v1/auth', userAuthRoutes);


app.get('*', (req, res) => res.status(404).send({ message: 'Page not found. Please visit /api/v1' }));

const port = 9000;

app.listen(process.env.PORT || `${port}`, () => console.log(`Server started at localhost ${port}`));


export default app;
