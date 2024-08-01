import { Request, Response, NextFunction } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    user?: string
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Forbidden: No token provided' })
  }

  const token = authHeader.split(' ')[1]
  if (token) {
    req.user = token
    next()
  } else {
    return res.status(403).json({ error: 'Forbidden: Invalid token' })
  }
  return
}
