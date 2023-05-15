import express from 'express';
import { BlogsModel } from '../Models';

require('dotenv').config();

import useGetQuery from '../hooks/useGetQuery';

const maxItemsPerPage = 7;

class BlogsController {
  async get(req: express.Request, res: express.Response) {
    const blogs = new BlogsModel();

    const itemCount = await blogs.collection.countDocuments();
    const totalPages = Math.ceil(itemCount / maxItemsPerPage);

    const customQuery = useGetQuery(req);

    blogs.collection
      .find()
      .limit(maxItemsPerPage)
      .skip((+customQuery.page - 1) * maxItemsPerPage)
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
