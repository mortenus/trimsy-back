import mongoose, { Schema, Document } from 'mongoose';

import isEmail from 'validator/lib/isEmail';

interface IWeb extends Document {
  fullname: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  email: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  //   text: {
  //     type: Schema.Types.String;
  //     ref: string;
  //     require: true;
  //   };
  order: {
    productType: {
      type: Schema.Types.String;
      ref: string;
      require: true;
    };

    purpose: {
      type: Schema.Types.String;
      ref: string;
      require: true;
    };

    seo: {
      type: Schema.Types.String;
      ref: string;
      require: true;
    };
  };

  ip: {
    type: Schema.Types.String;
    ref: string;
  };
  userAgent: { type: Schema.Types.String; ref: string };
}

const WebSchema = new Schema(
  {
    fullname: { type: Schema.Types.String, required: 'Fullname is required' },
    email: {
      type: Schema.Types.String,
      required: 'Email address is required',
      validate: [isEmail, 'Invalid email'],
    },
    // text: { type: Schema.Types.String, required: 'Text is required' },
    order: {
      productType: { type: Schema.Types.String },
      purpose: { type: Schema.Types.String },
      seo: { type: Schema.Types.String },
    },
    ip: { type: Schema.Types.String },
    userAgent: { type: Schema.Types.String },
  },
  {
    timestamps: true,
  },
);

const WebModel = mongoose.model<IWeb>('web', WebSchema);

export default WebModel;
