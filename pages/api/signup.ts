import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import db from 'utils/db';
import { UserModel } from 'models/UserModel';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return;

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    return res.status(422).json({ message: 'Validation error!' });
  }

  await db.connect();

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    await db.disconnect();
    return;
  }

  const newUser = new UserModel({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();

  await db.disconnect();

  return res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export default handler;
