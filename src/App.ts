import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// application route
app.use('/api/', router);
// global error handler
app.use(globalErrorHandler);

export default app;
