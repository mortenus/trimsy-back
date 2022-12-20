import bodyParser from 'body-parser';
import express from 'express';
import io from 'socket.io';
import cors from 'cors';

import { FormController } from '../controllers';
import { checkAuth } from '../middlewares';

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

  app.post('/form', FormController.submit);
};

export default routes;
