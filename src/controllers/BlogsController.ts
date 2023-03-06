import express from 'express';
import { BlogsModel } from '../Models';

require('dotenv').config();

class BlogsController {
  get(req: express.Request, res: express.Response) {
    const blogs = new BlogsModel();

    const itemCount = +blogs.collection.countDocuments();
    const totalPages = Math.ceil(itemCount / 5);

    blogs.collection
      .find()
      .limit(5)
      .skip(0)
      .toArray()
      .then((result) => {
        const data = {
          items: result,
          totalPages,
        };

        res.send(data);
      })
      .catch((err) => res.status(400).json(err));
  }
}

export default BlogsController;
