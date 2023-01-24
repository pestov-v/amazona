import { Schema, Model, models } from 'mongoose';
import { IProduct } from 'types';
import { createModel } from 'utils/createModel';

interface IMethods {}
type TModel = Model<IProduct, {}, IMethods>;

export const schema = new Schema<IProduct, TModel, IMethods>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: { type: String, default: '' },
  },
  { timestamps: true }
);

const modelName = 'Product';
export const ProductModel = models[modelName] || createModel(modelName, schema);
