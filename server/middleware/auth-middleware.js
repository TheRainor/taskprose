import jwt from "jsonwebtoken";
import { findUserById } from "../models/user-model.js";
import { isTokenBlacklistedModel } from "../models/blacklist-model.js";
import { refreshTokenService } from "../services/auth-service.js";

// Helper functions
function createUnauthorizedError(message = "Unauthorized access") {
  const err = new Error(message);
  err.statusCode = 401;
  return err;
}

async function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}


// Middleware: Authenticate tokens
export async function authenticateAccessToken(req, res, next) {
  try {
    const header = req.get('Authorization') || req.headers?.authorization;
    const headerToken = header?.split(/\s+/)[1]?.trim();
    const accessToken = headerToken ?? req.cookies?.jwt_access;
    
    if (!accessToken) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
    

    if (await isTokenBlacklistedModel(accessToken)) throw createUnauthorizedError("Oturumunuzun süresi doldu.");

    const decoded = await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET);
    
    if (!decoded) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
    
    const user = await findUserById(decoded.userId);
    
    if (!user) throw createUnauthorizedError("Oturumunuzun süresi doldu.");
  
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("jwt_access"); 
    next(err);
  }
}