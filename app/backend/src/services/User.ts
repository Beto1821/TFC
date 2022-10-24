import User from '../database/models/User';
import decodeToken from '../util/decodeToken';
import { IUser } from '../interfaces/IUser';

export default class UserService {
  findByEmail = async (email: string): Promise<IUser | null> => {
    const result = await User.findOne({ where: { email } });
    return result;
  };

  getRole = (token: string) => {
    const { role } = decodeToken(token);

    return { role };
  };
}
