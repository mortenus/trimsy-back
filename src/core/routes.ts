import bodyParser from 'body-parser';
import express from 'express';
import io from 'socket.io';
import cors from 'cors';

import { FormController, CareersController } from '../controllers';
import { checkAuth, rateLimit } from '../middlewares';

const routes = (app: express.Express, io?: io.Socket) => {
  //   app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(
    cors({
      origin: 'https://trimsy.org',
    }),
  );
  app.use(checkAuth);

  app.use('/form', rateLimit);

  app.post('/form', FormController.submit);
  app.post('/careers', CareersController.submit);
};

export default routes;
