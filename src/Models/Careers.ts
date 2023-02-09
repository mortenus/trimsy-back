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
  type: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
}

const CareersSchema = new Schema(
  {
    fullname: { type: Schema.Types.String, required: 'Fullname is required' },
    email: {
      type: Schema.Types.String,
      required: 'Email address is required',
      validate: [isEmail, 'Invalid email'],
    },
    type: { type: Schema.Types.String, required: 'Type is required' },
  },
  {
    timestamps: true,
  },
);

const CareersModel = mongoose.model<IForm>('careers', CareersSchema);

export default CareersModel;
