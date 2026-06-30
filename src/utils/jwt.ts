import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/env';

export interface TokenPayload {
  userId: string;
}

export const signToken = (userId: string, expiresIn: string) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: expiresIn as any });

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as any as TokenPayload;
  } catch {
    return null;
  }
};
