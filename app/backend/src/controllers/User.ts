import { Request, Response } from 'express';
import UserService from '../services/User';

class UserController {
  getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const role = UserService.getRole(authorization as string);

    return res.status(200).json(role);
  };
}

export default new UserController();
