import express from 'express';
import redFlagsRoute from './routes/index';

const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to Ireporter',
}));

// middlewares
app.use('/api/v1/red-flags', redFlagsRoute);

app.get('*', (req, res) => res.status(404).send({ message: 'Page not found. Please visit /api/v1' }));
const port = 3000 || process.env.port;
app.listen(port, () => console.log(`app running on port ${port}`));

export default app;
