import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from './routes/index.js';
import menuMakananRouter from './routes/menumakanan.js';
import requestLogger from './middleware/requestLogger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/menumakanan', menuMakananRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
