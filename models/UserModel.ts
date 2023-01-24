import { Schema, Model, models } from 'mongoose';
import { IUser } from 'types';
import { createModel } from 'utils/createModel';

interface IMethods {}

type TModel = Model<IUser, {}, IMethods>;

export const schema = new Schema<IUser, TModel, IMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const modelName = 'User';
export const UserModel = models[modelName] || createModel(modelName, schema);
