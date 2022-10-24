import { sign } from 'jsonwebtoken';

const GeraToken = (payload: unknown) => {
  const token = sign({ payload }, process.env.JWT_SECRET as string, { expiresIn: '10d' });
  return token;
};

export default GeraToken;
