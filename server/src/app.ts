import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import api from './api';
import * as middlewares from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

console.log('ENVIRONMENT: ', process.env.NODE_ENV);

app.use(morgan('dev'));
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        'https://lagniappefoods.store',
        'https://lagniappe-orders-app.herokuapp.com',
      ],
    },
  }),
);

// https://stackoverflow.com/questions/63351799/react-fetch-credentials-include-breaks-my-entire-request-and-i-get-an-error
app.use(
  cors({
    origin: process.env.BASE_URL, // (Whatever your frontend url is)
    credentials: true, // <= Accept credentials (cookies) sent by the client
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../../../client/build')));

// The order of these matter, consider refactoring middleware
app.use('/api/v1', api);

app.get('*/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../../client/build/index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

app.use(middlewares.notFound);
app.use(errorHandler); // Custom error middleware

export default app;
