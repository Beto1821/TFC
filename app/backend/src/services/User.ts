import user from '../database/models/user';
import decodeToken from '../util/decodeToken';
import { IUser } from '../interfaces/IUser';

class UserService {
  findByEmail = async (email: string): Promise<IUser | null> => {
    const result = await user.findOne({ where: { email } });
    return result;
  };

  getRole = (token: string) => {
    const { role } = decodeToken(token);

    return { role };
  };
}

export default new UserService();
