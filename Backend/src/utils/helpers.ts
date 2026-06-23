import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

function formatZodError(error: ZodError): string {
  return error.issues.map((e) => e.message).join(', ');
}

export function validateBody(schema: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: formatZodError(result.error),
      });
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery(schema: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: formatZodError(result.error),
      });
    }
    req.query = result.data as Request['query'];
    next();
  };
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
