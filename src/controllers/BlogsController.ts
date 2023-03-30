import express from 'express';
import { BlogsModel } from '../Models';

require('dotenv').config();

import useGetQuery from '../hooks/useGetQuery';

const maxItemsPerPage = 4;

class BlogsController {
  async get(req: express.Request, res: express.Response) {
    const blogs = new BlogsModel();

    const itemCount = await blogs.collection.countDocuments();
    const totalPages = Math.ceil(itemCount / maxItemsPerPage);

    const customQuery = useGetQuery(req);

    const hashtags = await blogs.collection.aggregate([
      {
        $unwind: '$hashtags',
      },
      {
        $group: {
          _id: '$hashtags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          hashtag: '$_id',
          count: 1,
        },
      },
    ]);

    blogs.collection
      .find()
      .limit(maxItemsPerPage)
      .skip((+customQuery.page - 1) * maxItemsPerPage)
      .toArray()
      .then((result) => {
        const data = {
          items: result,
          totalPages,
          hashtags,
        };

        res.send(data);
      })
      .catch((err) => res.status(400).json(err));
  }
}

export default BlogsController;
