import { PrismaClient, User } from '../generated/prisma/client';  
import { CreateUserDto } from '../dtos/user/CreateUserDto';
import { UpdateUserDto } from '../dtos/user/UpdateUserDto';
import { SearchFilters, SearchResult } from '../models/User';

const prisma = new PrismaClient();

export class UserRepository {
  static async search(
    filters: SearchFilters,
    limit: number,
    page: number,
    order: string
  ): Promise<SearchResult> {
    const where: any = {};

    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }

    const total = await prisma.user.count({ where });

    const data = await prisma.user.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        name: order === 'asc' ? 'asc' : 'desc',
      },
    });

    return { data, total };
  }

  static async create(data: CreateUserDto): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  static async update(id: number, data: UpdateUserDto): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async remove(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
