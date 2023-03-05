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
