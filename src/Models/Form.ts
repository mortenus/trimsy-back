import mongoose, { Schema, Document } from 'mongoose';

import isEmail from 'validator/lib/isEmail';

interface IForm extends Document {
  name: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  email: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  text: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  ip: {
    type: Schema.Types.String;
    ref: string;
  };
  userAgent: {
    type: Schema.Types.String;
    ref: string;
  };
}

const FormSchema = new Schema(
  {
    fullname: { type: Schema.Types.String, required: 'Fullname is required' },
    email: {
      type: Schema.Types.String,
      required: 'Email address is required',
      validate: [isEmail, 'Invalid email'],
    },
    text: { type: Schema.Types.String, required: 'Text is required' },
    ip: { type: Schema.Types.String },
    userAgent: { type: Schema.Types.String },
  },
  {
    timestamps: true,
  },
);

const FormModel = mongoose.model<IForm>('form', FormSchema);

export default FormModel;
