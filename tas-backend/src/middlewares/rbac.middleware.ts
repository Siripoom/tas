import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export function requireRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        code: "401_UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        code: "403_FORBIDDEN",
        message: "Forbidden",
      });
    }

    return next();
  };
}
