import express from 'express';
import { BlogsModel } from '../Models';

require('dotenv').config();

class BlogsController {
  async get(req: express.Request, res: express.Response) {
    const blogs = new BlogsModel();

    const itemCount = await +blogs.collection.countDocuments();
    const totalPages = Math.ceil(itemCount / 5);

    //get query
    const url = require('url');

    const { query } = url.parse(req.url, true);

    blogs.collection
      .find()
      .limit(5)
      .skip(query.page * 5)
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
