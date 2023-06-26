import bodyParser from 'body-parser';
import express from 'express';
import io from 'socket.io';
import cors from 'cors';

import { FormController, CareersController, BlogsController } from '../controllers';
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
  app.set('trust proxy', true);

  app.use('/form', rateLimit);
  app.use('/careers', rateLimit);

  app.post('/form', FormController.submit);
  app.post('/careers', CareersController.submit);

  app.get('/blogs', BlogsController.get);
  app.get('/blog/search', BlogsController.search);
};

export default routes;
