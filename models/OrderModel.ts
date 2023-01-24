import { Schema, Model, models, Types } from 'mongoose';
import { IOrder } from 'types';
import { createModel } from 'utils/createModel';

interface IMethods {}
type TModel = Model<IOrder, {}, IMethods>;

export const schema = new Schema<IOrder, TModel, IMethods>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

const modelName = 'Order';
export const OrderModel = models[modelName] || createModel(modelName, schema);
