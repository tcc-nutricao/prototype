import { Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/AuthController';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await AuthController.login(req, res, next);
  } catch (error) {
    next(error);
  }
};

import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  email: string;
}

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
