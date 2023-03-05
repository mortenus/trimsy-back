import express from 'express';
import { BlogsModel } from '../Models';

require('dotenv').config();

class BlogsController {
  get(req: express.Request, res: express.Response) {
    const blogs = new BlogsModel();

    const result = blogs.collection.find({}).toArray();

    res.send(result);
  }
}

export default BlogsController;
