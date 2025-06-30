import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { AppError } from '../exceptions/AppError';
import { formatZodErrors } from '../utils/formatZodErrors';
import { CreateUserSchema } from '../dtos/user/CreateUserDto';

export class UserController {
    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { filters, limit, page, order } = req.body;
            const { data, total } = await UserService.search(filters, limit, page, order);
            
            return res.status(200).json({ data, total });
        } catch (err) {
            next(err);
        }
    }

    static async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            data.role = this.translateRole(data.role)

            const parseResult = CreateUserSchema.safeParse(data);

            if (!parseResult.success) {
                const errors = formatZodErrors(parseResult.error);
                return res.status(422).json({ error: true, data: errors });
            }

            const user = await UserService.insert(data);
            return res.status(201).json(user);
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: true, data: err.details });
            }

             next(err as Error);        
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            data.role = this.translateRole(data.role)

            const parseResult = CreateUserSchema.safeParse(data);

            if (!parseResult.success) {
                const errors = formatZodErrors(parseResult.error);
                return res.status(422).json({ error: true, data: errors });
            }
            
            const { id, ...updateData } = data;

            if (!id) {
                return res.status(400).json({
                    errors: [{ message: 'ID não informado.' }]
                });
            }

            const user = await UserService.update(id, updateData);
            return res.status(200).json(user); 
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: true, data: err.details });
            }

            next(err as Error); 
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: [{ message: 'ID não informado.' }]
                });
            }

            const deletedUser = await UserService.remove(Number(id));

            if (!deletedUser) {
                return res.status(404).json({
                    errors: [{ message: 'Usuário não encontrado.' }]
                });
            }

            return res.status(200).json({ message: 'Usuário removido com sucesso.' });
        } catch (err) {
            next(err);
        }
    }

    static translateRole(role: string | null): string | null {
        const roleNames = [
            { label: 'Profissional', value: 'PROFESSIONAL' },
            { label: 'Padrão', value: 'STANDARD' },
        ]

        return roleNames.find(item => item.label === role)?.value ?? null
     }

}
