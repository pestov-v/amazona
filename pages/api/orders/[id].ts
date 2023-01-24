import { OrderModel } from 'models/OrderModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from 'utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //
  const session = await getSession({ req });

  console.log('session', session);

  if (!session) {
    return res.status(401).send('Signin is required!');
  }

  await db.connect();
  const order = await OrderModel.findById(req.query.id);
  if (!order) return res.status(404).send('Product not found');

  db.disconnect();
  return res.send(order);
};

export default handler;
