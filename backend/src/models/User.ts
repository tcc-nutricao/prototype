export type UserRole = 'STANDARD' | 'PROFESSIONAL';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface SearchFilters {
  name?: string;
  email?: string;
}

export interface SearchResult {
  data: User[];
  total: number;
}
