import { ZodError } from 'zod';

export function formatZodErrors(err: ZodError) {
  return err.errors.reduce((acc, curr) => {
    const field = curr.path[0] as string;
    if (!acc[field]) acc[field] = curr.message;
    return acc;
  }, {} as Record<string, string>);
}

