import express from 'express';
import { BlogsModel } from '../Models';

require('dotenv').config();

class BlogsController {
  get(req: express.Request, res: express.Response) {
    const blogs = new BlogsModel();

    blogs.collection
      .find()
      .toArray()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.status(400).json(err));
  }
}

export default BlogsController;
