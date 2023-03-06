import mongoose, { Schema, Document } from 'mongoose';

import isEmail from 'validator/lib/isEmail';

interface IBlogs extends Document {}

const BlogsSchema = new Schema(
  {},
  {
    timestamps: true,
  },
);

const BlogsModel = mongoose.model<IBlogs>('blogs', BlogsSchema);

export default BlogsModel;

const a = [
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
  {
    data: {
      date: 'March 2, 2023',
      title: 'How To Improve SEO of your Website in 5 Steps',
      description:
        'When SEO is set up and used correctly – it could bring lots of new traffic to the web page. It is not complex to accomplish, while optimizing your website could play important part in boosting your search presence. Google receives 90% of all online searches. That’s why we’re going to talk about setting up SEO for Googling and connect to Google Search Console for detailed analysis.',
      imgUrl: 'https://trimsy.org/uploads/1666542894623.jpg',
    },
    slug: '/blog/how-to-improve-seo-of-your-website-in-5-steps',
  },
];
