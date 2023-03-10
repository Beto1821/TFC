import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import UserService from '../services/User';
import geraToken from '../util/geratoken';
import decoToken from '../util/decodeToken';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const user = await UserService.findByEmail(email);

  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const data = {
    role: user.role,
    email: user.email,
  };
  const token = geraToken(data);
  res.status(200).json({ token });
  next();
};

const jwtValidate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    decoToken(authorization);
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default {
  authenticate,
  jwtValidate,
};
