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

  async search(req: express.Request, res: express.Response) {
    const searchQuery = String(req.query.q); // Get the search query from the request query parameters

    try {
      const results = await BlogsModel.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: 'textScore' } },
      ).sort({ score: { $meta: 'textScore' } });

      if (results.length > 0) {
        res.json(results);
      } else {
        // No exact match, search for similar or relevant blog posts
        const relevantResults = await BlogsModel.find(
          {
            $or: [
              { fullText: { $regex: searchQuery, $options: 'i' } },
              { title: { $regex: searchQuery, $options: 'i' } },
              { hashtag: { $regex: searchQuery, $options: 'i' } },
            ],
          },
          { 'data.related': 0 },
        );

        res.json(relevantResults);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default BlogsController;
