import express from 'express';
import dotenv from 'dotenv';
import redFlagsRoute from './routes/index';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to Ireporter',
}));

// middlewares
app.use('/api/v1/red-flags', redFlagsRoute);

app.get('*', (req, res) => res.status(404).send({ message: 'Page not found. Please visit /api/v1' }));
/* const port = process.env.port || 3000;
app.listen(port, () => console.log(`app running on port ${port}`)); */

const port = 9000;

app.listen(process.env.PORT || `${port}`, () => console.log(`Server started at localhost ${port}`));


export default app;
