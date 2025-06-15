import { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';

export const insert = async (req: Request, res: Response, next: NextFunction) =>
  UserController.insert(req, res, next);

export const search = async (req: Request, res: Response, next: NextFunction) =>
  UserController.search(req, res, next);

export const update = async (req: Request, res: Response, next: NextFunction) =>
  UserController.update(req, res, next);

export const remove = async (req: Request, res: Response, next: NextFunction) =>
  UserController.remove(req, res, next);
