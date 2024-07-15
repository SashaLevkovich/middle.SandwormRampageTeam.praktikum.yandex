import { Request, Response, NextFunction } from 'express'
// @ts-ignore
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: number
  username: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload
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
  // console.log(jwt.sign({ id: 887 }, 'myjwtsecretkey', { expiresIn: '240h' }))
  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload
    req.user = decoded
    next()
  } else {
    return res.status(403).json({ error: 'Forbidden: Invalid token' })
  }
  return
}
