import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      code: "401_UNAUTHORIZED",
      message: "Missing bearer token",
    });
  }

  try {
    const token = authHeader.replace("Bearer ", "").trim();
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
    };
    return next();
  } catch (_error) {
    return res.status(401).json({
      code: "401_UNAUTHORIZED",
      message: "Invalid or expired access token",
    });
  }
}
