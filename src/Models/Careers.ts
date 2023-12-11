import mongoose, { Schema, Document } from 'mongoose';

import isEmail from 'validator/lib/isEmail';

type TGeneral = {
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
  product: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  status: 'completed' | 'canceled' | 'pending' | 'new';
  description?: string;
};

type TsecurityData = {
  ip: {
    type: Schema.Types.String;
    ref: string;
  };
  userAgent: {
    type: Schema.Types.String;
    ref: string;
  };
};

interface IForm extends Document {
  general: TGeneral;
  securityData: TsecurityData;
}

const CareersSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    general: {
      fullname: { type: Schema.Types.String, required: 'Fullname is required' },
      email: {
        type: Schema.Types.String,
        required: 'Email address is required',
        validate: [isEmail, 'Invalid email'],
      },
      product: { type: Schema.Types.String, required: 'Product is required' },
      status: {
        type: Schema.Types.String,
        enum: ['completed', 'canceled', 'pending', 'new'],
        default: 'new',
      },
      description: {
        type: Schema.Types.String,
      },
    },
    securityData: {
      ip: { type: Schema.Types.String },
      userAgent: { type: Schema.Types.String },
    },
  },
  {
    timestamps: true,
  },
);

const CareersModel = mongoose.model<IForm>('careers', CareersSchema);

export default CareersModel;
