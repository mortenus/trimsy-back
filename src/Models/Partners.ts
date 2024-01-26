import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import generatePasswordHash from '../utils/generatePasswordHash';

interface IUser {
  username: string;
  email: string;
  description?: string;
  password: string;
}

interface IAdditional {
  socialMedia: string;
  companyName?: string;
  hearAbout: string;
  audienceTarget: string;
  details?: string;
}

export interface IPartners extends Document {
  user?: IUser;
  additional?: IAdditional;
}

const PartnersSchema = new Schema(
  {
    user: {
      type: {
        username: String,
        email: String,
        description: String,
        password: String,
      },
      required: true,
    },
    additional: {
      type: {
        socialMedia: String,
        companyName: String,
        hearAbout: String,
        audienceTarget: String,
        details: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

PartnersSchema.set('toJSON', {
  virtuals: true,
});

PartnersSchema.pre('save', function (next) {
  const user: any = this;

  if (!user.confirm_hash) {
    generatePasswordHash('defaultPassword')
      .then((hash) => {
        user.user.password = String(hash);
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});

const PartnersModel = mongoose.model<IPartners>('partners', PartnersSchema);

export default PartnersModel;
