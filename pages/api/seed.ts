import { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from 'models/UserModel';
import { ProductModel } from 'models/ProductModel';
import data from 'utils/data';
import db from 'utils/db';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  await UserModel.deleteMany();
  await UserModel.insertMany(data.users);
  await ProductModel.deleteMany();
  await ProductModel.insertMany(data.products);
  await db.disconnect();

  return res.json({ message: 'Seeded successfully' });
}
