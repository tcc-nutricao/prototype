import { CreateUserDto } from '../dtos/user/CreateUserDto';
import { UpdateUserDto } from '../dtos/user/UpdateUserDto';
import { UserRepository } from '../repositories/UserRepository';
import { SearchFilters, SearchResult } from '../models/User';
import { AppError } from '../exceptions/AppError';
import bcrypt from 'bcrypt';

export class UserService {
    static async search(
        filters: SearchFilters,
        limit: number = 10,
        page: number = 1,
        order: string = 'asc'
    ): Promise<SearchResult> {
        return await UserRepository.search(filters, limit, page, order);
    }

    static async insert(data: CreateUserDto) {
        try {
            const existing = await UserRepository.findByEmail(data.email);
            
            if (existing) {
                throw new AppError('Email já cadastrado', 400, { emailInUse: 'Este e-mail já está em uso.' });
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            return await UserRepository.create({
                ...data,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    static async update(id: number, data: UpdateUserDto) {
        try {
            const existing = await UserRepository.findByEmail(data.email);
            
            if (existing) {
                throw new AppError('Email já cadastrado', 400, { emailInUse: 'Este e-mail já está em uso.' });
            }

            return await UserRepository.update(id, data);
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    static async remove(id: number) {
        try {
            return await UserRepository.remove(id);
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}
