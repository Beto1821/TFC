import { verify } from 'jsonwebtoken';

interface IJWT {
  payload: {
    role: string;
    email: string;
  };
}

const decodeJWT = (token: string) => {
  const { payload } = verify(token, process.env.JWT_SECRET as string) as IJWT;
  return payload;
};

export default decodeJWT;
