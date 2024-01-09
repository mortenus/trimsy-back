import bodyParser from 'body-parser';
import express from 'express';
import io from 'socket.io';
import cors from 'cors';

import {
  FormController,
  CareersController,
  BlogsController,
  AdminController,
  WebController,
} from '../controllers';
import { loginValidation, registerValidation } from '../utils/validations';
import { checkAuth, checkAuthUser, rateLimit } from '../middlewares';

const routes = (app: express.Express, io?: io.Socket) => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  app.use(
    cors({
      origin: [
        'https://trimsy.org',
        'https://trimsy.ca',
        'https://admin.trimsy.org',
        'https://admin.trimsy.ca',
      ],
    }),
  );
  app.use(cors());
  app.use(checkAuth);
  //   app.set('trust proxy', true);

  app.use('/form', rateLimit);
  app.use('/web', rateLimit);
  app.use('/careers', rateLimit);

  app.post('/form', FormController.submit);
  app.post('/web', WebController.submit);
  app.post('/careers', CareersController.submit);

  // blog
  app.get('/blog', BlogsController.get);
  app.get('/blog/search', BlogsController.search);

  //   app.get('/user/verify', AdminController.verify);
  //   app.post('/user/signup', registerValidation, AdminController.create);
  //   app.post('/user/signin', loginValidation, AdminController.login);
  //   app.get('/user/find', AdminController.findUsers);
  //   app.get('/user/:id', AdminController.show);
  //   app.delete('/user/:id', AdminController.delete);

  app.post('/auth/admin/signin', loginValidation, AdminController.login);
  app.post('/auth/admin/signup', registerValidation, AdminController.create);

  app.use('/admin/*', (req, res, next) => {
    checkAuthUser(req, res, next);
  });

  // admin
  //   app.use('/admin/me', (req, res, next) => {
  //     checkAuthUser(req, res, next);
  //   });
  //   app.use('/admin/updateDepartment', (req, res, next) => {
  //     checkAuthUser(req, res, next);
  //   });
  app.get('/admin/me', AdminController.getMe);
  app.patch('/admin/updateDepartment', AdminController.updateDepartment);

  // admin extended
  app.get('/admin/careers', CareersController.get);
  app.get('/admin/careers/dashboard', CareersController.getDashboard);
  app.get('/admin/careers/query', CareersController.getWithQuery);
  app.delete('/admin/careers/:id', CareersController.delete);
  app.patch('/admin/careers/status', CareersController.patchStatus);
};

export default routes;
