import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import generatePasswordHash from '../utils/generatePasswordHash';

export interface IAdmin extends Document {
  email?: string;
  fullname?: string;
  password?: string;
  confirmed?: boolean;
  confirm_hash?: any;
  imageUrl?: string;
  companyPosition?: string;
}

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: 'Email address is required',
      validate: [isEmail, 'Invalid email'],
      index: { unique: true },
    },
    fullname: {
      type: String,
      required: 'Fullname is required',
    },
    imageUrl: {
      type: String,
      required: 'Image url is required',
    },
    companyPosition: {
      type: String,
      required: 'Company position is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    defaultDepartment: {
      type: String,
      default: 'development',
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirm_hash: String,
  },
  {
    timestamps: true,
  },
);

AdminSchema.set('toJSON', {
  virtuals: true,
});

AdminSchema.pre('save', function (next) {
  const user: any = this;

  if (!user.confirm_hash) {
    generatePasswordHash(user.password)
      .then((hash) => {
        user.password = String(hash);
        generatePasswordHash(+new Date() + '').then((hash) => {
          user.confirm_hash = String(hash);
          next();
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});

const AdminModel = mongoose.model<IAdmin>('admins', AdminSchema);

export default AdminModel;
