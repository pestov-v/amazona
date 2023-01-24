import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from 'utils/db';
import { OrderModel } from 'models/OrderModel';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  console.log('REQUEST', req);

  if (!session) {
    return res.status(401).send('Signin is required!');
  }

  const { user } = session;
  await db.connect();
  const newOrder = new OrderModel({
    ...JSON.parse(req.body),
    user: user.id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;
